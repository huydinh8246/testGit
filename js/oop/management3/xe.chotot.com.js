'use strict'

import WebCrawler from '../../core/services/client/crawler/crawler-e-commerce'
import _ from 'underscore'
import Action from '../../core/services/client/crawler/crawler-action'
import moment from 'moment'
import cheerio from 'cheerio'
import request from 'request-promise'
import crypto from 'crypto'
import async from 'async'


export const OPTIONS = {
  id: 'xe_chotot_com',
  platform: 'e_commerce',
  website: 'https://xe.chotot.com/',
  indexSelector: '.ctAdlisting ul li > a',
  crawlComment: false,
  idRegex: /(?:\-)(p\d+)(?:\.html)/g,
  crawlerManagerName: 'management3',
  delayMax: 3000,
  delayMin: 1000,
  search: false,
};

const DEFAULT_FROM = {
  name: 'chotot',
  fid: 'xe_chotot_com',
  link: 'https://xe.chotot.com/'
};

export default class Crawler extends WebCrawler {

  saveAll = false;

  constructor(options) {
    super(_.extend({}, options, OPTIONS))
  }

  processId(s) {
    return `${this.options.id}-${crypto.createHash('md5').update(s).digest('hex')}`
  }

  buildCategoryOptions(category, pageNumber) {
    return {
      uri: `${this.options.website}mua-ban-oto/${category.slug}`,
      // uri: `${this.options.website}mua-ban-oto/toyota`,
      qs: {
        page: pageNumber,
      }
    }
  }

  // async test($){
  //   const url = $('div[itemprop="seller"] a').attr('href')
  //   const data = await request(this.buildRequest(url));
  //   console.log('aaaaa');
  //   console.log(data);
  // }

  async visitCategories(categories) {
    if (Array.isArray(categories)) {
      for (const category of categories) {
        await this.visitCategory(category, 1);
      }
    }
  }

  async getFeed($, link) {
    const id = this.processId(link, true);
    const elasticsearchId = `${this.options.id}_${id}`;
    const productsInformation = this.getProducts($);
    const description = this.getDescription($).run();
    // console.log(productsInformation);
    // const comments = await this.getComments(elasticsearchId, id);
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
      // comments,
      // commentsCount: comments.length
    }
  }

  async getProducts($, reviews) {

    console.log(JSON.parse($('#__NEXT_DATA__').text()).props.initialState.contactInfo);
    let info = {}
    let specifications = {}
    let pictures = []
    $('img.styles__Image-sc-1r1xial-4').map(function () {
      pictures.push($(this).attr('src'))
    })
    let price = $('.styles__Price-sc-14jh840-4').attr('content')

    $('.adParamItem___3NDQP .media-middle').map(function () {
      let mKey = $(this).find('span:first-child').text().trim()
      mKey = mKey.slice(0, mKey.length - 1);
      let mValue = $(this).find('span:last-child').text().trim()
      switch (mKey.toLowerCase()) {
        case 'Số chỗ':
          info['số ghế ngồi'] = mValue
          break;

        default:
          info[mKey] = mValue
          break;
      }
    })

    

    info['Giá'] = price
    info['Mô tả'] = $('.styles__DescriptionAd-sc-14jh840-7').text().trim();
    info['Phiên bản'] = ''
    info['An toàn'] = []
    info['Tiện nghi'] = []
    info['Thông số kỹ thuật'] = specifications
    info['Người bán'] = $('.col-md-4 .styles__NameDiv-jjbnsh-3 > b').text()
    info['Số điện thoại'] = $('#call_phone_btn').attr('href').split(':')[1]
    info['Địa chỉ'] = $('.media-body .fz13').text()
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
