export default {
  login:{
    u: 'user/login', //params: user_name,password,repass
    m: 'get'
  },
  // 首页数据
  getHomeData: {
    u: 'Api/gateway?action=index', //params: common params
    m: 'get'
  },
  // 购卡记录
  getBuyCardRecord: {
    u: 'Api/gateway?action=card.backpackLogin', //params: pageSize,p
    m: 'get'
  },
  // 售卡记录
  getSalesCardRecord: {
    u: 'Api/gateway?action=card.backpackLogout', //params: pageSize,p
    m: 'get'
  },
  // 查找用户
  getUserByUserid: {
    u: 'Api/gateway?action=search', //params: uid
    m: 'get'
  },
  // 赠送房卡
  giveAwayRoomcard: {
    u: 'Api/gateway?action=card.send', // params: uid,itemNum:房卡数
    m: 'get'
  },
  // 销售记录
  getSalesRecord: {
    u: 'Api/gateway?action=saleRecords', // params: uid,pageSize,p
    m: 'get'
  },
  // 封号 || 解封
  operationAccount: {
    u: 'Api/gateway?action=forbidLogin', // params: uid, stat:1封号, 2:解封
    m: 'get'
  },
  // 解除代理
  relieveProxy: {
    u: 'Api/gateway?action=relieveAgency', // params: uid, [replaceUid]
    m: 'get'
  },
  // 升为代理
  upgradeProxy: {
    u: 'Api/gateway?action=upgradeAgency', // params: uid
    m: 'get'
  },
  // 解除绑定
  relieveBind: {
    u: 'Api/gateway/?action=delUnbund', // params: uid
    m: 'get'
  },
  // 越级查看
  leapfrogQuery: {
    u: 'Api/gateway/?action=proxySuper', // params: uid,proxy_type:0 = 查看用户 1 = 查看代理
    m: 'get'
  },
  // 查看卡耗记录
  cardConsumeRecord: {
    u: 'Api/gateway/?action=getUseCards', //params: uid,pageSize,p
    m: 'get'
  },
  // 注册
  register: {
    u: 'User/regist', // params: uid, user_name, passward, comfirmPwd
    m: 'get'
  },
  // 获取用户详情数据
  getUserInfo: {
    u: 'Api/gateway/?action=getUserInfo', // params: uid,[isSearch]
    m: 'get'
  },
  // 获赠记录（用户详情）
  getSalesRecordForUserDetail: {
    u: 'Api/gateway/?action=getSellCardLog', // params: uid,p, pageSize
    m: 'get'
  },
  // 赠送记录（用户详情）
  getSendRecordForUserDetail: {
    u: 'Api/gateway/?action=getSendCardLog', // params: uid,p, pageSize
    m: 'get'
  },
  // 提取房卡
  extractRoomcard: {
    u: 'Api/gateway/?action=card.gain', // params: uid,itemNum=提取数量
    m: 'get'
  },
  // 修改权限（代理）
  modifyProxy: {
    u: 'Api/gateway/?action=modifyPer', //params: uid,permiss(权限列表)
    m: 'get'
  },
  // 对战记录
  battleRecord: {
    u: 'Api/gateway/?action=gameRecord', //params: uid,roomId=房间号
    m: 'get'
  },
  // 房间列表
  getRoomlist: {
    u: 'Api/gateway/?action=room', // params: p, pageSize
    m: 'get'
  },
  // 解散房间
  dissolveRoom: {
    u: 'Api/gateway/?action=dissolve', //params: roomId=房间号
    m: 'get'
  },
  // 管理房间
  manageRoom: {
    u: 'Api/gateway/?action=gameRoomList', // params: p, pageSize
    m: 'get'
  },
  // 获取代理详情
  getProxyInfo: {
    u: 'Api/gateway/?action=getProxyInfo', // params: uid,[isSearch]
    m: 'get'
  },
  // 修改密码
  modifyPassword: {
    u: 'Api/gateway/?action=modifyUserPwd', //params: oldPwd,newPwd,confirmPwd
    m: 'get'
  },
  // 创建房间 列表
  createRoomList: {
    u: 'Api/gateway/?action=group.gameRuleList', //params: p, pageSize
    m: 'get'
  },
  // 创建房间-游戏规则
  createRoomForGameRule: {
    u: 'Api/gateway/?action=group.getRuleDetail', //params: id , key
    m: 'get'
  },
  // 创建房间
  createRoom: {
    u: 'Api/gateway/?action=createRoom', // params: cargs:规则, ruid:游戏ID, roname: 游戏名称
    m: 'get'
  },
  // 默认规则- 列表
  defaultRuleList: {
    u: 'Api/gateway/?action=group.groupIndex', //params: p, pageSize, id
    m: 'get'
  },
  // 删除规则
  deleteRule: {
    u: 'Api/gateway/?action=group.groupDelete', //params: id
    m: 'get'
  },
  // 默认规则-详情
  defaultDetail: {
    u: 'Api/gateway/?action=group.groupUpdate', //params: id
    m: 'get'
  },
  // 修改默认规则
  modifyDefaultRule: {
    u: 'Api/gateway/?action=group.groupSave', //params: id
    m: 'get'
  },
  // 微信登录平台验证
  checkWeixinLogin: {
    u: 'User/hasWxlogin',
    m: 'get'
  },
  // 微信登录
  weixinLogin: {
    u: 'User/wxLogin', // params: userid, token
    m: 'get'
  },
  // 获取茶馆数据
  getMyGroup: {
    u: 'Api/gateway/?action=Group.getMyGroup',
    m: 'get'
  },
  // 创建茶馆
  createGroup: {
    u: 'Api/gateway/?action=Group.create',
    m: 'get'
  },
  // 获取茶馆成员
  getMemberByGroup: {
    u: 'Api/gateway/?action=Group.userList',
    m: 'get'
  },
  // 茶馆成员操作(同意，拒绝，拉黑)
  operationGroup: {
    u: 'Api/gateway/?action=Group.admin',
    m: 'get'
  },
  // 茶馆成员上分
  groupMemberUpCoin: {
    u: 'Api/gateway/?action=Group.addCoin',
    m: 'get'
  },
  // 茶馆成员下分
  groupMemberDownCoin: {
    u: 'Api/gateway/?action=Group.resetCoin',
    m: 'get'
  },
  // 获取茶馆ID
  getGroupId: {
    u: 'Api/gateway/?action=Group.getId',
    m: 'get'
  },
  // 修改茶馆信息
  modifyGroupInfo: {
    u: 'Api/gateway/?action=Group.modify',
    m: 'get'
  }
};

