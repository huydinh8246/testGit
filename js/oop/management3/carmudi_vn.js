'use strict'

import WebCrawler from '../../core/services/client/crawler/crawler-e-commerce'
import _ from 'underscore'
import Action from '../../core/services/client/crawler/crawler-action'
import moment from 'moment'
import cheerio from 'cheerio'
import request from 'request-promise'
import crypto from 'crypto'
import {
  text
} from 'body-parser'

export const OPTIONS = {
  id: 'carmudi_vn',
  platform: 'e_commerce',
  website: 'https://www.carmudi.vn/',
  indexSelector: '.media .list-info div > a',
  idRegex: /(?:\-)(p\d+)(?:\.html)/g,
  crawlerManagerName: 'management3',
  delayMax: 3000,
  delayMin: 1000,
  search: false,
  crawlComment: false,
};

const DEFAULT_FROM = {
  name: 'carmudi',
  fid: 'carmudi_vn',
  link: 'https://www.carmudi.vn/'
};

export default class Crawler extends WebCrawler {

  saveAll = false;

  constructor(options) {
    super(_.extend({}, options, OPTIONS))
  }

  getFeedId($) {
    return $('.listing-subtitle div .value:first-child').text()
  }

  buildCategoryOptions(category, pageNumber) {
    return {
      // uri: `${this.options.website}${category.slug}/index${pageNumber}.html`,
      uri: `${this.options.website}xe-o-to-toyota/index${pageNumber}.html`,
    }
  }

  // hasNextPageCategory(links, page, $) {
  //   return page < parseInt($('.pagination-list li a').eq(-3).text())
  // }

  async getFeed($, link) {
    const id = this.getFeedId($);
    const elasticsearchId = `${this.options.id}_${id}`;
    const productsInformation = this.getProducts($);
    const description = this.getDescription($).run();
    const comments = await this.getComments(elasticsearchId, id);
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

  getCreatedTime($) {
    return new Action({
      ctx: $,
      sel: '.listing-subtitle span:last-child',
      get: 'element',
      post: (res) => moment(res, 'DD/MM/YYYY').toDate()
    })
  }

  getTitle($) {
    return new Action({
      ctx: $,
      sel: '.pages-title-name-detail',
      get: 'text',
    })
  }

  getProducts($) {
    let info = {}
    let specifications = {}
    let pictures = []
    $('.main-section img.lazy').map(function () {
      pictures.push($(this).attr('src'))
    })
    let price = this.parsePrice($('.price-tag').data("price"))

    $('#area_location tr').map(function () {
      let mKey = $(this).find('.name').text().trim();
      let mValue = $(this).find('.value').text().trim();
      switch (mKey) {
        case 'Họ và tên':
          info['Tên người bán'] = mValue
          break;

        case 'Số điện thoại':
          info['Điện thoại'] = mValue
          break;

        case 'Địa chỉ':
          info['Địa chỉ người bán'] = mValue
          break;

        case 'Tỉnh/ Thành phố':
          info['Địa điểm bán'] = mValue
          break;

        default:
          break;
      }
    })

    $('.list-features > div').map(function () {
      let mKey = $(this).text().trim().split(':')[0]
      let mValue = $(this).text().trim().split(': ')[1]
      switch (mKey) {
        case 'Tỉnh/ Thành phố':
          info['Địa điểm bán'] = mValue
          break;

        case 'Tình trạng xe':
          info['Tình trạng'] = ['còn hàng', mValue]
          break;

        case 'Hãng xe':
          info['Hãng'] = mValue
          break;

        default:
          info[mKey] = mValue
          break;
      }
    })

    $('#area_basic_information tbody tr').map(function () {
      let mKey = $(this).find('.name').text().trim()
      let mValue = $(this).find('.value').text().trim()
      switch (mKey) {
        case 'Số cửa':
          info[mKey] = mValue
          break;
        case 'Số ghế ngồi':
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

    let safe = []
    $('#area_safety ul li').map(function () {
      safe.push($(this).text())
    })

    let comfort = []
    $('#area_comfort ul li').map(function () {
      comfort.push($(this).text())
    })

    info['Giá'] = price
    info['Mô tả'] = $('#area_description p').text().trim()
    info['An toàn'] = safe
    info['Tiện nghi'] = comfort
    info['Thông số kỹ thuật'] = specifications
    info['Link ảnh'] = pictures
    info['Platform'] = 'Trading'
    return info
  }

}

let categories = [{
    "name": "Toyota",
    "slug": "Toyota"
  },
  {
    "name": "Honda",
    "slug": "Honda"
  },
  {
    "name": "Hyundai",
    "slug": "Hyundai"
  },
  {
    "name": "Mercedes Benz",
    "slug": "Mercedes-Benz"
  },
  {
    "name": "Mazda",
    "slug": "Mazda"
  },
  {
    "name": "Mitsubishi",
    "slug": "Mitsubishi"
  },
  {
    "name": "Chevrolet",
    "slug": "Chevrolet"
  },
  {
    "name": "Kia",
    "slug": "Kia"
  },
  {
    "name": "BMW",
    "slug": "BMW"
  },
  {
    "name": "Ford",
    "slug": "Ford"
  },
  {
    "name": "Suzuki",
    "slug": "Suzuki"
  },
  {
    "name": "Audi",
    "slug": "Audi"
  },
  {
    "name": "Lexus",
    "slug": "Lexus"
  },
  {
    "name": "Nissan",
    "slug": "Nissan"
  },
  {
    "name": "Land Rover",
    "slug": "Land-Rover"
  },
  {
    "name": "Isuzu",
    "slug": "Isuzu"
  },
  {
    "name": "Volkswagen",
    "slug": "Volkswagen"
  },
  {
    "name": "Peugeot",
    "slug": "Peugeot"
  },
  {
    "name": "Vinfast",
    "slug": "Vinfast"
  },
  {
    "name": "Renault",
    "slug": "Renault"
  }
]
