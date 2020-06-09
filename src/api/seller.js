import { requestApi } from '../util/network'

// 卖家退出登录
export const logout =
    (seller_name) =>
      requestApi(
        '/Sellerlogout/index',
        'POST',
        {
          seller_name: seller_name,
          client: 'wap'
        },
        'seller'
      )
// 获取店铺基本信息
export const getSellerInfo =
    () =>
      requestApi(
        '/Sellerindex/index',
        'POST',
        {
          'client_type': 'wap'
        },
        'seller'
      )
export const getStoreClass =
    () =>
      requestApi(
        '/store/get_store_class',
        'POST',
        {

        }
      )
export const getStoreGrade =
    () =>
      requestApi(
        '/store/get_store_grade',
        'POST',
        {

        }
      )
export const getStoreJoinin =
    () =>
      requestApi(
        '/Sellerjoinin/get_info',
        'POST',
        {

        },
        'member'
      )
export const saveStoreJoinin2 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/step2',
        'POST',
        joinin,
        'member'
      )
export const saveStoreJoinin3 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/step3',
        'POST',
        joinin,
        'member'
      )
export const saveStoreJoinin4 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/step4',
        'POST',
        joinin,
        'member'
      )
export const saveStoreJoinin5 =
    (joinin) =>
      requestApi(
        '/Sellerjoinin/pay_save',
        'POST',
        joinin,
        'member'
      )
export const uploadInfoFile =
    (file) =>
      requestApi(
        '/Sellerjoinin/upload_image',
        'POST',
        file,
        'member',
        true
      )
// 获取店铺日志记录
export const getSellerLogList =
    () =>
      requestApi(
        '/Sellerlog/log_list',
        'POST',
        {

        },
        'seller'
      )

// 获取店铺的消费记录
export const getSellerCostList =
    () =>
      requestApi(
        '/Sellercost/cost_list',
        'POST',
        {

        },
        'seller'
      )
