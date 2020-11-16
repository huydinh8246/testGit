'use strict'

import WebCrawler from '../../core/services/client/crawler/crawler-e-commerce'
import _ from 'underscore'
import Action from '../../core/services/client/crawler/crawler-action'
import moment from 'moment'
import cheerio from 'cheerio'
import request from 'request-promise'
import crypto from 'crypto'

export const OPTIONS = {
  id: 'oto_com_vn',
  platform: 'e_commerce',
  website: 'https://oto.com.vn/',
  indexSelector: '.item-car h3 a',
  crawlComment: false,
  idRegex: /(?:\-)(p\d+)(?:\.html)/g,
  crawlerManagerName: 'management3',
  delayMax: 3000,
  delayMin: 1000,
  search: false,
};

const DEFAULT_FROM = {
  name: 'oto',
  fid: 'oto_com_vn',
  link: 'https://oto.com.vn/'
};

export default class Crawler extends WebCrawler {

  saveAll = false;

  constructor(options) {
    super(_.extend({}, options, OPTIONS))
  }

  getFeedId($) {
    return $('.date-code .code').text().split(': ')[1]
  }

  buildCategoryOptions(category, pageNumber) {
    // return {
    //   // uri: `${this.options.website}/${category.slug}/p${pageNumber}`,
    //   uri: `https://oto.com.vn/mua-ban-xe-toyota/p${pageNumber}`,
    // }
    return {
        method: 'GET',
        uri: `https://oto.com.vn/mua-ban-xe-toyota/p${pageNumber}`,
        gzip: true,
        transform: (body) => {
            return cheerio.load(body)
        }
    }
  }

  hasNextPageCategory(links, page, $) {
    return page < 1
  }

  async getFeed($, link) {
    const id = this.getFeedId($);
    const elasticsearchId = `${this.options.id}_${id}`;
    const productsInformation = this.getProducts($);
    const description = this.getDescription($).run();
    const comments = await this.getComments(elasticsearchId, id);
    // console.log(productsInformation);
    return {
      id: elasticsearchId,
      platform: this.options.platform,
      page: this.pageId,
      title: this.getTitle($).run(),
      picture: this.getPicture($).run(),
      link: link,
      message: description,
      description: description,
      industry: this.options.industryCode,
      lastUpdatedTime: new Date(),
      productsInformation,
      from: DEFAULT_FROM,
      comments,
      commentsCount: comments.length
    }
  }

  getProducts($) {
    let info = {}
    let specifications = {}

    $('.head-breadcrumb a:nth-child(3)').text().split(' ').map((res, i) => {
      if (i == 0) {
        info['Hãng'] = res
      } else if (i == 1) {
        info['Dòng xe'] = res
      } else {
        info['Phiên bản'] = res
      }
    })

    $('.box-info-detail .list-info > li').map(function () {
      let mKey = $(this).find('.label').text()
      $(this).find('label').remove()
      let mValue = $(this).text().trim()
      switch (mKey) {
        case 'Địa chỉ rao bán':
          info['Địa chỉ bán'] = mValue
          break;
        case 'Số km đã đi':
          info['Số km'] = mValue
          break;
        case 'Tình trạng':
          info[mKey] = [mValue, 'còn hàng']
          break;
        default:
          info[mKey] = mValue
          break;
      }
    })

    $('#tab-baseinfo ul > li').map(function () {
      let mKey = $(this).find('.label').text()
      $(this).find('label').remove()
      let mValue = $(this).text().trim()
      switch (mKey) {
        case 'Số chỗ':
          info['Số ghế ngồi'] = mValue
          break;
        case 'Số cửa':
          info['Số cửa'] = mValue
          break;
        case 'Số Km đã đi':
          info['Số Km'] = mValue
          break;
        case 'Hộp số':
          info[mKey] = mValue
          break;
        case 'Màu xe':
          info['Màu ngoại thất'] = mValue
          break;
        case 'Màu nội thất':
          info[mKey] = mValue
          break;
        case 'Nhiên liệu':
          info[mKey] = mValue
          break;
        default:
          specifications[mKey] = mValue
          break;
      }
    })

    let pictures = []
    $('#osgslide > span img').map(function () {
      pictures.push($(this).attr('src'))
    })

    if ($('#tab-techinfo li').length > 0) {
      $('#tab-techinfo li').map(function () {
        let mKey = $(this).find('.label').text()
        $(this).find('label').remove()
        let mValue = $(this).text().trim()
        specifications[mKey] = mValue
      })
    }

    info['Giá'] = $('#price').attr('value')
    info['Mô tả'] = $('#content-view-more').text().trim()
    info['Phiên bản'] = 'version'
    info['An toàn'] = []
    info['Tiện nghi'] = []
    info['Thông số kỹ thuật'] = specifications
    info['Người bán'] = $('.box-info-detail .small-s h3').text()
    info['Số điện thoại'] = $('.box-info-detail .mobile').data('phone')
    info['Địa chỉ'] = $('.box-info-detail .small-s p').text()
    info['Link ảnh'] = pictures
    info['Platform'] = 'Trading'
    return info
  }


}

const categories = [{
    "name": "Toyota",
    "slug": "toyota"
  },
  {
    "name": "Honda",
    "slug": "honda"
  },
  {
    "name": "Hyundai",
    "slug": "hyundai"
  },
  {
    "name": "Mazda",
    "slug": "mazda"
  },
  {
    "name": "Kia",
    "slug": "kia"
  },
  {
    "name": "Ford",
    "slug": "ford"
  },
  {
    "name": "Chevrolet",
    "slug": "chevrolet"
  },
  {
    "name": "Nissan",
    "slug": "nissan"
  },
  {
    "name": "Mitsubishi",
    "slug": "mitsubishi"
  },
  {
    "name": "Isuzu",
    "slug": "isuzu"
  },
  {
    "name": "Suzuki",
    "slug": "suzuki"
  },
  {
    "name": "BMW",
    "slug": "bmw"
  },
  {
    "name": "Mercedes -Benz",
    "slug": "mercedes-benz"
  },
  {
    "name": "Vinfast",
    "slug": "vinfast"
  }
]
