'use strict'

import WebCrawler from '../../core/services/client/crawler/crawler-e-commerce'
import _ from 'underscore'
import Action from '../../core/services/client/crawler/crawler-action'
import moment from 'moment'
import cheerio from 'cheerio'
import request from 'request-promise'
import crypto from 'crypto'

export const OPTIONS = {
  id: 'anycar_vn',
  platform: 'e_commerce',
  website: 'https://anycar.vn/',
  indexSelector: '.card-title a',
  crawlComment: false,
  idRegex: /(?:\-)(p\d+)(?:\.html)/g,
  crawlerManagerName: 'management3',
  delayMax: 3000,
  delayMin: 1000,
  search: false,
};

const DEFAULT_FROM = {
  name: 'anycar',
  fid: 'anycar_vn',
  link: 'https://anycar.vn/'
};

export default class Crawler extends WebCrawler {

  saveAll = false;

  constructor(options) {
    super(_.extend({}, options, OPTIONS))
  }

  getFeedId($) {
    return $('#car-photos .car-id').text().split('#')[1]
  }

  buildCategoryOptions(category, pageNumber) {
    return {
      // uri: `${this.options.website}/ban-xe-oto/${category.slug}/page,${pageNumber}`,
      uri: `https://anycar.vn/ban-xe-oto/${category.slug}/`,
    }
  }

  hasNextPageCategory(links, page, $) {
    return page < 1
  }

  getDescription($) {
    return new Action({
      ctx: $,
      sel: 'meta[name="description"]',
      attr: 'content',
    })
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
    let header = []
    let seller = {}
    $('.breadcrumb li a').map(function (x) {
      header.push($(this).text())
    })

    $('.col-md-8 .car-detail-table .line').map(function () {
      let mKey = $(this).find('.line-label').text()
      let mValue = $(this).find('.line-value').text()
      switch (mKey) {
        case 'Nhiên liệu':
          info['fuel'] = mValue
          break;
        case 'Xuất xứ':
          info['source'] = mValue
          break;
        case 'Hộp số':
          info['gear'] = mValue
          break;
        case 'Kiểu dáng':
          info['segment'] = mValue
          break;
        case 'Năm SX':
          info['productionYear'] = mValue
          break;
        case 'Số chỗ ngồi':
          info['seats'] = mValue
          break;
        default:
          specifications[mKey] = mValue
          break;
      }
    })

    // get pictures
    let pictures = []
    $('.thumb-photo img').map(function () {
      pictures.push($(this).data('src'))
    })

    // get seller
    let sellerInfo = $('.d-none.rounded.shadow-sm > div:nth-child(3) b').text()
    if (sellerInfo.includes('Anycar')) {
      seller['sellerName'] = sellerInfo.slice(0, 6)
      seller['sellerAddress'] = sellerInfo.slice(7)
    } else {
      seller['sellerName'] = null
      info['sellerAddress'] = null
    }
    seller['location'] = $('meta[itemprop="address"]').attr('content')
    seller['sellerPhone'] = $('.o2o-rolling-phone3').text()

    // specs
    let newSpecs = {}
    for (const key in specifications) {
      let nKey = key.toLowerCase();
      nKey = this.removeAccent(nKey)
      nKey = nKey.split(' ').join('_')
      if (nKey.includes('mau_noi')) {
        newSpecs['interiorColor'] = specifications[key]
      }
      if (nKey.includes('mau_ngoai' || ('mau_xe'))) {
        newSpecs['exteriorColor'] = specifications[key]
      }
      if (nKey.includes('km')) {
        newSpecs['km'] = specifications[key]
      }
      if (nKey.includes('xi_lanh') || nKey.includes('dung_tich')) {
        newSpecs['xilanh'] = specifications[key]
      }
      if (nKey.includes('so_cua') || nKey.includes('cua')) {
        newSpecs['windows'] = specifications[key]
      }
      if (nKey.includes('dan_dong')) {
        newSpecs['drive'] = specifications[key]
      }
      if (nKey.includes('tai_chinh')) {
        newSpecs['finance'] = specifications[key]
      }
    }

    let ver = $('h1.h3').text()
    info['brand'] = header[header.length - 2]
    info['model'] = header[header.length - 1]
    info['grade'] = $('.h3.py-md-3').text()
    info['priece'] = $('#origin-price').attr('data-origin-price');
    info['option'] = ver
    info['description'] = $('meta[name="description"]').attr('content')
    info['safety'] = []
    info['equipment'] = []
    info['specs'] = newSpecs
    info['seller'] = seller
    info['pictures'] = pictures
    info['platform'] = 'Trading'
    return info
  }
}


const categories = [{
    "name": "Toyota",
    "slug": "toyota-c1808"
  },
  {
    "name": "Kia",
    "slug": "kia-c1808"
  },
  {
    "name": "Hyundai",
    "slug": "hyundai-c1808"
  },
  {
    "name": "Mazda",
    "slug": "mazda-c1808"
  },
  {
    "name": "Ford",
    "slug": "ford-c1808"
  },
  {
    "name": "Honda",
    "slug": "honda-c1808"
  },
  {
    "name": "Mitsubishi",
    "slug": "mitsubishi-c1808"
  },
  {
    "name": "Nissan",
    "slug": "nissan-c1808"
  }
]
