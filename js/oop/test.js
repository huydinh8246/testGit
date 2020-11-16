// class CarInfo {
//     constructor()

//     info = {
//         id,
//         brand, //hãng
//         model, //dòng xe
//         grade, //tên xe
//         option, //phiên bản
//         productionYear, //năm sản xuất
//         productType, //tình trạng
//         status,
//         source, //xuất xứ
//         segment, //kiểu dáng
//         price, //giá
//         description, //mô tả
//         safety, //an toàn
//         equipmenet, //tiện nghi
//         platform,
//         specs: {
//             interiorColor, //màu nội thất
//             exteriorColor, //màu ngoại thất
//             xilanh, //dung tích xi lanh
//             gear, //hộp số
//             fuel, //nhiên liệu
//             km, //số km
//             seats, //số chỗ
//             windows, //cửa sổ
//             drive, //dân động
//             finance, //tài chính
//         }, //thông số kỹ thuật
//         seller: { //người bán
//             idSeller,
//             name,
//             phone,
//             address,
//             type,
//             location,
//         },
//         pictures,
//     }

//     processSpecs(specs) {
//         let newSpecs = {}
//         for (const key in specs) {
//             let nKey = key.toLowerCase();
//             nKey = this.normalStr(nKey)
//             if (nKey.includes('mau_noi')) {
//                 newSpecs['interiorColor'] = specs[key]
//             }
//             if (nKey.includes('mau_ngoai')) {
//                 newSpecs['exteriorColor'] = specs[key]
//             }
//             if (nKey.includes('km')) {
//                 newSpecs['km'] = specs[key]
//             }
//             if (nKey.includes('xi_lanh')) {
//                 newSpecs['xilanh'] = specs[key]
//             }
//             if (nKey.includes('cua_so')) {
//                 newSpecs['windows'] = specs[key]
//             }
//             if (nKey.includes('dan_dong')) {
//                 newSpecs['drive'] = specs[key]
//             }
//             if (nKey.includes('tai_chinh')) {
//                 newSpecs['finance'] = specs[key]
//             }
//         }
//         return newSpecs
//     }

//     getBrand($) {
//         return null
//     }

//     splitID(str) {
//         return str.split(' ').join('_')
//     }

//     change(str) {
//         const selectors = ['ô tô', 'đại lý', 'bãi xe']
//         for (let selector in selectors) {
//             if (str === selector) {
//                 // this.removeAccent(str);
//                 str.split(' ').join('')
//             }
//         }
//     }

//     //auto
//     // ar.map(function (i) {
//     //     if (i.includes('auto')) {
//     //         let location = i.replace('auto', '')
//     //             .split(' ').join('')
//     //         console.log('auto_' + location);
//     //     }
//     // })



//     removeAccent(str) {
//         str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
//         str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
//         str = str.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
//         str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
//         str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
//         str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
//         str = str.replace(/đ/gi, 'd');
//         return str;
//     }
// }


let a = {

    "brand": "Toyota",
    "model": "Camry",
    "productionYear": "2012",
    "productType": "Đã sử dụng",
    "segment": "Sedan",
    "grade": "Toyota Camry E 2012",
    "price": 575000000,
    "description": "Có em Toyota Camry 2012 bản G Tự động, màu đen siêu chất, odo 8v bao test, anh em quan tâm giao lưu alo em ngay nhé",
    "option": "",
    "safety": [],
    "equipmenet": [],
    "km": "80000",
    "gear": "Tự động",
    "fuel": "Xăng",
    "seats": 5,
    "màu_Nội": 'bule',
    "idSeller": "",
    "name": "SALON TÍN THÀNH PHÁT ",
    "phone": "0981439986",
    "address": "Quận Thanh Xuân, Hà Nội",
    "type": "",
    "location": "",
    "pictures": [
        "https://cdn.chotot.com/8maEzES-jrZzywmVLHJQboGB7H6fV5Ze_9Px8ucoGmg/preset:view/plain/1928962934c10a2e2549dda290d817ed-2685533356211299500.jpg",
        "https://cdn.chotot.com/iPe3rqXEvQf4H_4quk75KI9Dv2PHVH-5-nfRgjQrIW4/preset:view/plain/9c0a629e639f5595287cc6f2aa14f169-2685533341887352589.jpg",
        "https://cdn.chotot.com/Vv7dFwLT2hzVLZiAcVjW4cIv-PTvDydsw-mBOo10sjI/preset:view/plain/1c1a1f85ead8363fa3a245e73e2e4de2-2685533341629247713.jpg",
        "https://cdn.chotot.com/Sx5XLQa2PIf-UFYgfes3e0Miyt1vSXo8ROB3XkVplmc/preset:view/plain/de838a12c71d21321c7e9052c9b02e01-2685533341367193357.jpg",
        "https://cdn.chotot.com/VQuMuz4GphlDZQ2nfT_XoDOFJZiWFtxgdFBv4D6tw5I/preset:view/plain/c8d8a123e72a3c341df936729f6cca46-2685533341584367076.jpg",
        "https://cdn.chotot.com/idGI68hjgB0jCKxJYjHI1sJBjPvjzja8viO7qT7CqTk/preset:view/plain/c4caec4ab5220873403c6e1a7158f3fe-2685533341726007007.jpg",
        "https://cdn.chotot.com/ocx1xZwyAByNpKuzR47KeKDwc1_xsr-_PSqXCeQcq8M/preset:view/plain/bb361f157cd89ca1c4676c5ca46503cc-2685533355332460255.jpg",
        "https://cdn.chotot.com/-zt-oazdJMU9wj_PTSSBBUuOgX1oUZqZ9xlMwMgg9Z8/preset:view/plain/2978af2f46c7ba43f419ea5f55098e46-2685533355593407972.jpg",
        "https://cdn.chotot.com/H7SqyFxGSEeohM24MyH4NDvqlELZPMgVFqeABDsIH_Y/preset:view/plain/57c2267440d7b3fa367b948f9c9da83f-2685533356281339364.jpg",
        "https://cdn.chotot.com/ApVNbnKuxCc0ni2Ximp7FOFXRCpPRia9LGcxWUtWiAE/preset:view/plain/34a2785c78aaa3bb3bdbffd91a8be87b-2685533355321975980.jpg",
        "https://cdn.chotot.com/ZU8X-hpaU7S6ElSZi1AsKiikVh_KXrvTY_b8KGAa_jU/preset:view/plain/cce85586490d1cd99f557f12ff1f52b5-2685533356767944164.jpg",
        "https://cdn.chotot.com/IiX-2JbVKKCzFiEV8QvWPYRHSP7PW86lyGF2JvO_NGg/preset:view/plain/31aa73e1744d20dad80c0225ab680359-2685533355808580780.jpg",
        "https://cdn.chotot.com/8maEzES-jrZzywmVLHJQboGB7H6fV5Ze_9Px8ucoGmg/preset:view/plain/1928962934c10a2e2549dda290d817ed-2685533356211299500.jpg",
        "https://cdn.chotot.com/iPe3rqXEvQf4H_4quk75KI9Dv2PHVH-5-nfRgjQrIW4/preset:view/plain/9c0a629e639f5595287cc6f2aa14f169-2685533341887352589.jpg",
        "https://cdn.chotot.com/Vv7dFwLT2hzVLZiAcVjW4cIv-PTvDydsw-mBOo10sjI/preset:view/plain/1c1a1f85ead8363fa3a245e73e2e4de2-2685533341629247713.jpg",
        "https://cdn.chotot.com/Sx5XLQa2PIf-UFYgfes3e0Miyt1vSXo8ROB3XkVplmc/preset:view/plain/de838a12c71d21321c7e9052c9b02e01-2685533341367193357.jpg",
        "https://cdn.chotot.com/VQuMuz4GphlDZQ2nfT_XoDOFJZiWFtxgdFBv4D6tw5I/preset:view/plain/c8d8a123e72a3c341df936729f6cca46-2685533341584367076.jpg",
        "https://cdn.chotot.com/idGI68hjgB0jCKxJYjHI1sJBjPvjzja8viO7qT7CqTk/preset:view/plain/c4caec4ab5220873403c6e1a7158f3fe-2685533341726007007.jpg",
        "https://cdn.chotot.com/ocx1xZwyAByNpKuzR47KeKDwc1_xsr-_PSqXCeQcq8M/preset:view/plain/bb361f157cd89ca1c4676c5ca46503cc-2685533355332460255.jpg",
        "https://cdn.chotot.com/-zt-oazdJMU9wj_PTSSBBUuOgX1oUZqZ9xlMwMgg9Z8/preset:view/plain/2978af2f46c7ba43f419ea5f55098e46-2685533355593407972.jpg",
        "https://cdn.chotot.com/H7SqyFxGSEeohM24MyH4NDvqlELZPMgVFqeABDsIH_Y/preset:view/plain/57c2267440d7b3fa367b948f9c9da83f-2685533356281339364.jpg",
        "https://cdn.chotot.com/ApVNbnKuxCc0ni2Ximp7FOFXRCpPRia9LGcxWUtWiAE/preset:view/plain/34a2785c78aaa3bb3bdbffd91a8be87b-2685533355321975980.jpg",
        "https://cdn.chotot.com/ZU8X-hpaU7S6ElSZi1AsKiikVh_KXrvTY_b8KGAa_jU/preset:view/plain/cce85586490d1cd99f557f12ff1f52b5-2685533356767944164.jpg",
        "https://cdn.chotot.com/IiX-2JbVKKCzFiEV8QvWPYRHSP7PW86lyGF2JvO_NGg/preset:view/plain/31aa73e1744d20dad80c0225ab680359-2685533355808580780.jpg",
        "https://cdn.chotot.com/8maEzES-jrZzywmVLHJQboGB7H6fV5Ze_9Px8ucoGmg/preset:view/plain/1928962934c10a2e2549dda290d817ed-2685533356211299500.jpg"
    ],
    "platform": "Trading"

}


function cars(carInfo) {
    this.constructor.quantites++;
    // private variables
    var grade = carInfo.grade
    var carnameInfo = grade.split(' ')

    function getDrive(drive) {
        if (drive && drive.length > 0) {
            switch (true) {
                case (drive.includes('cầu trước') || drive.includes('FWD')):
                    return 'FWD';

                case (drive.includes('cầu sau') || drive.includes('RWD')):
                    return 'RWD';

                case (drive.includes('bán thời gian') || drive.includes('4WD')):
                    return '4WD';

                case (drive.includes('toàn thời gian') || drive.includes('AWD')):
                    return 'AWD';

                default:
                    return null;
            }
        }
    }

    function processSpecs(carinfo) {
        let newSpecs = {
            interiorColor: '', //màu nội thất
            exteriorColor: '', //màu ngoại thất
            xilanh: '', //dung tích xi lanh
            gear: null, //hộp số
            fuel: '', //nhiên liệu
            km: null, //số km
            seats: null, //số chỗ
            windows: null, //cửa sổ
            drive: '', //dân động
            finance: '', //tài chính
        }
        for (const key in carinfo) {
            let nKey = key.toLowerCase();
            console.log(nKey);
            nKey = nKey.split(' ').join('_')
            if (nKey.includes('màu_nội' || 'màu_Nội')) {
                newSpecs.interiorColor = carinfo[key]
            }
            if (nKey.includes('màu_ngoại' || ('màu_xe'))) {
                newSpecs['exteriorColor'] = carinfo[key]
            }
            if (nKey.includes('km')) {
                newSpecs['km'] = carinfo[key].replace(/(\D)/g, '')
            }
            if (nKey.includes('xi_lanh') || nKey.includes('dung_tích')) {
                newSpecs['xilanh'] = carinfo[key]
            }
            if (nKey.includes('hộp_số')) {
                newSpecs['gear'] = carinfo[key]
            }
            if (nKey.includes('cửa')) {
                newSpecs['windows'] = +carinfo[key].replace(/(\D)/g, '').trim()
            }
            if (nKey.includes('ngồi') | nKey.includes('chỗ')) {
                newSpecs['seats'] = +carinfo[key].replace(/(\D)/g, '').trim()
            }
            if (nKey.includes('dẫn_động')) {
                newSpecs['drive'] = getDrive(carinfo[key])
            }
            if (nKey.includes('tài_chính')) {
                newSpecs['finance'] = carinfo[key]
            }
            if (nKey === ('nhiên_liệu')) {
                newSpecs['fuel'] = carinfo[key]
            }
        }
        return newSpecs
    }

    function processSeller(carinfo) {
        return {
            name: carInfo.name,
            phone: carInfo.phone,
            address: carInfo.address,
            type: carInfo.type,
            location: carInfo.location,
        }
    }

    function processSellerId(name, brand) {
        let salons = ['salon', 'salon auto', 'ôtô']
        brand = brand.toLowerCase()
        name = name.toLowerCase()
        let selects = ['used car', 'mr', 'đỏ', 'ms']
        let sellerNameIn = name.split(' - ')
        if (sellerNameIn.length > 1) {
            for (let i = 0; i < sellerNameIn.length; i++) {
                for (let select in selects) {
                    if (sellerNameIn[i].includes(selects[select])) {
                        sellerNameIn.splice(i, 1)
                    }
                }
            }
        };
        let sellerId
        if (sellerNameIn[0].includes(brand)) {
            sellerId = sellerNameIn[0].replace(brand, '').split(' ').join('');
            return `${brand}_${removeAccent(sellerId)}`
        } else if (sellerNameIn[0].includes('auto')) {
            sellerId = sellerNameIn[0].replace('auto', '').split(' ').join('');
            return `${brand}_${removeAccent(sellerId)}`
        } else {
            sellerId = sellerNameIn[0].split(' ').filter(x => !salons.includes(x)).join('')
            return `salonoto_${removeAccent(sellerId)}`
        }
    }

    function removeAccent(str) {
        str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        str = str.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        str = str.replace(/đ/gi, 'd');
        return str;
    }
    // 
    this.grade = grade
    this.brand = carnameInfo[0]
    this.model = carnameInfo.filter(x => !x.includes(this.brand) && /([A-Z])\w+/g.test(x)).join() || null
    this.option = carnameInfo.filter(x => /([0-9])(.)[0-9][A-Z]+|[A-Z]{2,}|[A-Z] /g.test(x)).join() || null //phiên bản
    this.productionYear = carnameInfo[carnameInfo.length - 1] || null //năm sản xuất
    this.productType = carInfo.productType //tình trạng
    this.status = carInfo.status
    this.source = carInfo.source || carInfo['xuất xứ'] || carInfo['Xuất xứ']
    this.segment = carInfo.segment || carInfo['Kiểu dáng'] || carInfo['kiểu dáng']
    this.price = carInfo.price || null
    this.description = carInfo.description || null
    this.safety = carInfo.safety || null
    this.equipmenet = carInfo.equipmenet || null
    this.platform = carInfo.platform || null
    this.pictures = carInfo.pictures || null
    this.specs = processSpecs(carInfo)
    this.seller = processSeller(carInfo)
    this.seller.sellerId = processSellerId(this.seller.name, this.brand)
}

cars.prototype.getBrand = function () {
    return 'test'
}

function test(arr) {
    let testCars = new cars(arr)
    testCars.brand = testfunc()
    testCars.model = 'test'
    testCars.option = 'test'
    testCars.grade = 'test'

    function testfunc(){
        return 'testfunction'
    }
    console.log(testCars);
}

test(a)