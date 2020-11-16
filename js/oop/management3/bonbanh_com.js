'use strict'

import WebCrawler from '../../core/services/client/crawler/crawler-e-commerce'
import _ from 'underscore'
import Action from '../../core/services/client/crawler/crawler-action'
import moment from 'moment'
import cheerio from 'cheerio'
import request from 'request-promise'
import crypto from 'crypto'

export const OPTIONS = {
  id: 'bonbanh_com',
  platform: 'e_commerce',
  website: 'https://bonbanh.com/',
  indexSelector: '.car-item a',
  crawlComment: false,
  idRegex: /(?:\-)(p\d+)(?:\.html)/g,
  crawlerManagerName: 'management3',
  delayMax: 3000,
  delayMin: 1000,
  search: false,
};

const DEFAULT_FROM = {
  name: 'bonbanh',
  fid: 'bonbanh_com',
  link: 'https://bonbanh.com/'
};

export default class Crawler extends WebCrawler {

  saveAll = false;

  constructor(options) {
    super(_.extend({}, options, OPTIONS))
  }

  getIdFeed($) {
    return $('.breadcrum span:last-child').text().trim().split(' : ')[1]
  }

  buildCategoryOptions(category, pageNumber) {
    return {
      //   uri: `${this.options.website}oto/toyota/page,${pageNumber}`,
      uri: `${this.options.website}oto/${category.slug}/page,${pageNumber}`,
    }
  }

  async visitCategories(categories) {
    if (Array.isArray(categories)) {
      for (const category of categories) {
        await this.visitCategory(category, 1);
      }
    }
  }

  async getFeed($, link) {
    const id = this.getIdFeed($);
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
    let price
    if ($('.title h1').text().toLowerCase().includes("tỷ")) {
      price = $('.title h1').text().split('- ')[1]
        .replace(' Triệu', '000000')
        .replace(' Tỷ ', '')
    } else {
      price = $('.title h1').text().split('- ')[1]
        .replace(' Triệu', '000000')
    }
    let version = $('.breadcrum span b i').text().trim().split(' ')
      .slice(1, 4).join(' ');

    $('.breadcrum span b i').text().trim().split(' ').map(function (res, i, arr) {
      if (i == 1) {
        info['brand'] = res
      } else if (i == 2) {
        info['model'] = res
      } else if (i == arr.length - 1) {
        info['productionYear'] = res
      }
    });

    $('#sgg .tabber .tabbertab:nth-child(1) #mail_parent').map(function (x) {
      let mValue = $(this).find('.inp').text().trim()
      let mKey = $(this).find('.label').text().trim()
        .split(':')[0]
      switch (mKey.toLowerCase()) {
        case 'xuất xứ:':
          info['source'] = mValue
          break;
        case 'tình trạng:':
          info['productType'] = mValue
          break;
        case 'số cửa:':
          info['windows'] = mValue
          break;
        case 'hộp số:':
          info['gear'] = mValue
          break;
        case 'dòng xe:':
          info['model'] = mValue
          break;
        default:
          specifications[mKey] = mValue
          break;
      }
    })

    $('#sgg .tabber .tabbertab:nth-child(4) #mail_parent').map(function (x) {
      let mKey = $(this).find('label').text().trim().split(':')[0]
      let mValue = $(this).find('.inp').text().trim()
      specifications[mKey] = mValue
    })

    let safe = []
    $('#sgg .tabber .tabbertab:nth-child(2) #mail_parent').map(function () {
      let chkBox = $(this).find('.inp input').is(":checked")
        (chkBox) && safe.push($(this).find('.label_tab1').text().trim())
    });
    let convenient = []
    $('#sgg .tabber .tabbertab:nth-child(3) #mail_parent').map(function () {
      let chkBox = $(this).find('.inp input').is(":checked")
        (chkBox) && convenient.push($(this).find('.label_tab1').text().trim())
    });

    let phoneNum = []
    $('.contact-box .cinfo .cphone').map(function () {
      $(this).find('script').remove()
      phoneNum.push($(this).text())
    });
    let address = $('.contact-txt').html().split('<br>')[2]
    address = address.split(':')[1]
    let pictures = []
    $('#medium_img a').map(function () {
      pictures.push($(this).attr('href'))
    })


    let seller = {};
    seller['id'] = ''
    seller['name'] = $('.contact-box .cinfo .cname').text();
    seller['sellerPhone'] = phoneNum;
    seller['sellerAddress'] = htmlDecode(address)
    seller['sellerType'] = ''
    seller['location'] = htmlDecode(address)
    
    
    info['price'] = +price
    info['description'] = $('.des_txt').text().trim()
    info['Phiên bản'] = version
    info['safety'] = safe
    info['equipmenet'] = convenient
    info['specs'] = specifications
    info['seller'] = seller
    info['pictures'] = pictures
    info['Platform'] = 'Trading'
    return info
  }

}

function htmlDecode(input) {
  var doc = cheerio.load(input);
  return doc.text().trim();
}

const categories = [{
    "name": "Acura",
    "slug": "acura"
  },
  {
    "name": "Audi",
    "slug": "audi"
  },
  {
    "name": "BMW",
    "slug": "bmw"
  },
  {
    "name": "Chevrolet",
    "slug": "chevrolet"
  },
  {
    "name": "Daewoo",
    "slug": "daewoo"
  },
  {
    "name": "Daihatsu",
    "slug": "daihatsu"
  },
  {
    "name": "Fiat",
    "slug": "fiat"
  },
  {
    "name": "Ford",
    "slug": "ford"
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
    "name": "Isuzu",
    "slug": "isuzu"
  },
  {
    "name": "Kia",
    "slug": "kia"
  },
  {
    "name": "LandRover",
    "slug": "landrover"
  },
  {
    "name": "Lexus",
    "slug": "lexus"
  },
  {
    "name": "Mazda",
    "slug": "mazda"
  },
  {
    "name": "Mercedes Benz",
    "slug": "mercedes benz"
  },
  {
    "name": "MG",
    "slug": "mg"
  },
  {
    "name": "Mitsubishi",
    "slug": "mitsubishi"
  },
  {
    "name": "Nissan",
    "slug": "nissan"
  },
  {
    "name": "Peugeot",
    "slug": "peugeot"
  },
  {
    "name": "Porsche",
    "slug": "porsche"
  },
  {
    "name": "Suzuki",
    "slug": "suzuki"
  },
  {
    "name": "Toyota",
    "slug": "toyota"
  },
  {
    "name": "Vinfast",
    "slug": "vinfast"
  },
  {
    "name": "Volkswagen",
    "slug": "volkswagen"
  },
  {
    "name": "Alfa Romeo",
    "slug": "alfa romeo"
  },
  {
    "name": "Asia",
    "slug": "asia"
  },
  {
    "name": "Aston Martin",
    "slug": "aston martin"
  },
  {
    "name": "Baic",
    "slug": "baic"
  },
  {
    "name": "Bentley",
    "slug": "bentley"
  },
  {
    "name": "Brilliance",
    "slug": "brilliance"
  },
  {
    "name": "Buick",
    "slug": "buick"
  },
  {
    "name": "BYD",
    "slug": "byd"
  },
  {
    "name": "Cadillac",
    "slug": "cadillac"
  },
  {
    "name": "Changan",
    "slug": "changan"
  },
  {
    "name": "Chery",
    "slug": "chery"
  },
  {
    "name": "Chrysler",
    "slug": "chrysler"
  },
  {
    "name": "Citroen",
    "slug": "citroen"
  },
  {
    "name": "Datsun",
    "slug": "datsun"
  },
  {
    "name": "Dodge",
    "slug": "dodge"
  },
  {
    "name": "Dongfeng",
    "slug": "dongfeng"
  },
  {
    "name": "Ferrari",
    "slug": "ferrari"
  },
  {
    "name": "Gaz",
    "slug": "gaz"
  },
  {
    "name": "Geely",
    "slug": "geely"
  },
  {
    "name": "GMC",
    "slug": "gmc"
  },
  {
    "name": "Haima",
    "slug": "haima"
  },
  {
    "name": "Hino",
    "slug": "hino"
  },
  {
    "name": "Hummer",
    "slug": "hummer"
  },
  {
    "name": "Infiniti",
    "slug": "infiniti"
  },
  {
    "name": "Jaguar",
    "slug": "jaguar"
  },
  {
    "name": "Jeep",
    "slug": "jeep"
  },
  {
    "name": "JRD",
    "slug": "jrd"
  },
  {
    "name": "Lada",
    "slug": "lada"
  },
  {
    "name": "Lamborghini",
    "slug": "lamborghini"
  },
  {
    "name": "Lifan",
    "slug": "lifan"
  },
  {
    "name": "Lincoln",
    "slug": "lincoln"
  },
  {
    "name": "Luxgen",
    "slug": "luxgen"
  },
  {
    "name": "Maserati",
    "slug": "maserati"
  },
  {
    "name": "Maybach",
    "slug": "maybach"
  },
  {
    "name": "McLaren",
    "slug": "mclaren"
  },
  {
    "name": "Mekong",
    "slug": "mekong"
  },
  {
    "name": "Mercury",
    "slug": "mercury"
  },
  {
    "name": "Mini",
    "slug": "mini"
  },
  {
    "name": "Morgan",
    "slug": "morgan"
  },
  {
    "name": "Opel",
    "slug": "opel"
  },
  {
    "name": "Pontiac",
    "slug": "pontiac"
  },
  {
    "name": "Proton",
    "slug": "proton"
  },
  {
    "name": "RAM",
    "slug": "ram"
  },
  {
    "name": "Renault",
    "slug": "renault"
  },
  {
    "name": "Rolls Royce",
    "slug": "rolls royce"
  },
  {
    "name": "Rover",
    "slug": "rover"
  },
  {
    "name": "Samsung",
    "slug": "samsung"
  },
  {
    "name": "Scion",
    "slug": "scion"
  },
  {
    "name": "Smart",
    "slug": "smart"
  },
  {
    "name": "Ssangyong",
    "slug": "ssangyong"
  },
  {
    "name": "Subaru",
    "slug": "subaru"
  },
  {
    "name": "SYM",
    "slug": "sym"
  },
  {
    "name": "Tesla",
    "slug": "tesla"
  },
  {
    "name": "Thaco",
    "slug": "thaco"
  },
  {
    "name": "Tobe",
    "slug": "tobe"
  },
  {
    "name": "UAZ",
    "slug": "uaz"
  },
  {
    "name": "Vinaxuki",
    "slug": "vinaxuki"
  },
  {
    "name": "Volvo",
    "slug": "volvo"
  },
  {
    "name": "Zotye",
    "slug": "zotye"
  }
]
