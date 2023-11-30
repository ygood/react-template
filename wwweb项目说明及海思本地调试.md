# 新WEB

## 开发环境配置

环境要求:

| 名称     | 版本       |
| :------- | :--------- |
| 操作系统 | 18.04+     |
| node环境 | v16.14.2 + |

### 安装nodeJS

安装nvm：

1. 点击进入`https://github.com/nvm-sh/nvm`，如果github无法访问可选择访问`https://gitee.com/OpenCodeShare/nvm/tree/master`
2. 复制改仓库下的`install.sh`文件的内容
3. 本地新建`install.sh`文件，将上述复制的内容粘贴到该文件下
4. 修改该文件权限`chmod +x install.sh`
5. 执行该文件`./install.sh`
6. 添加以下内容至~/.bashrc

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

7. 执行`source ~/.bashrc`
8. 执行`nvm -v`,查看nvm是否安装成功

nvm安装node

1. 执行`nvm install v16.14.2`安装需要的node版本，建议使用`v16.14.2`版本
2. `nvm use v16.14.2`,使用此版本，执行`node -v`查看版本是否正确
3. 修改npm远端镜像源，`npm set registry https://registry.npmmirror.com`

### 安装yarn

1. 执行`npm install -g yarn`
2. 执行`yarn -v`查看是否安装成功
3. 修改yarn远端镜像源，`yarn config set registry https://registry.npmmirror.com`

## 项目构建

### 安装项目依赖与环境

1. 使用vscode打开项目代码，新建终端执行`yarn install`,等待项目依赖安装完成
2. 项目目录下新建`.env.development`文件，添加以下内容,注：`IP修改为自己环境的ip`：

```shell
# 本地调试api接口
REACT_APP_API_URL="http://172.27.235.182:3001"
# 禁用新的 JSX 转换
DISABLE_NEW_JSX_TRANSFORM=true
```

### 本地启动项目

1. 启动本地mock-server服务器，执行`yarn run db-json`;
2. 新建一个终端执行`yarn run start02`
3. 运行完根据提示即可访问调试环境

### 构建打包项目

终端执行`yarn run build02`,等待打包任务执行完成，打包后文件存在于工程目录下的`build`文件夹下

## 项目介绍

技术栈(未完全列出，详情参考package.json):

| 名称             | 版本     |
| :--------------- | :------- |
| React            | ^18.2.0  |
| antd             | ^4       |
| axios            | ^0.27.2  |
| typescript       | ^4.4.2   |
| recoil           | ^0.7.6   |
| react-router-dom | ^5       |
| babel-polyfill   | ^6.26.0  |
| lodash           | ^4.17.21 |

### 目录介绍：

`__json_server_mock`: 本地接口服务目录，本地调试时提供接口服务,重要文件及内容如下：

- jsonServer.js: mock-server启动配置文件，可修改监听的端口号
- db.json: 数据以及接口提供文件，可在此文件增加接口和数据

`craco.config.js`: 项目配置文件，业务开发可忽略

`i18nCompare.js`: 国际化文件对比脚本，可比较`public/i18n`下的翻译文件，保证翻译文件的一直性

`public`: 公共文件，无需编译，直接打包的内容

- i18n: 国际化文件目录，可在里面添加对应的翻译内容，格式为json格式

`src/`: 项目业务源代码(重要)

- Idata: 项目定义类型文件夹，用于定义数据类型
- components: 公用组件
- context: 定义context文件夹
- hooks: 定义hooks
- indexes: 多布局入口文件夹
- layoutApi: 多布局页面抽离出来的方法
- utils: 工具方法，提供多种公用工具函数
- assets: 图片文件夹，项目所用的文件都在此处
- constants: 内部包含了许多公用的内容，包括菜单，接口url以及正则等内容
- http: axios请求封装目录
- layouts: 页面文件内容
  - layout01：布局一，暂时未用
  - layout02：布局二，包括框架布局文件lauout，未认证页面，已认证页面以及路由定义等
- provider：公用provider目录
- recoil: recoil封装目录

### 重要文件以及功能说明

#### 添加一个路由以及一个菜单

1. 在`src/layouts/layout02/AuthedApp/page`目录下新增一个页面文件
2. 在`src/layouts/layout02/AuthedApp/page/index.ts`导出
3. 在`/src/layouts/layout02/AuthedApp/routesData.tsx`，需要的模块下新增对应的内容即可
4. 如果此功能需要后端管控，则需要在`/src/IData/systemInfo.d.ts`的文件增加对应的字段，新增的路由添加对应的`supportAbility`参数

路由字段说明:

| 字段            | 含义                                                                | 是否必须 |
| :-------------- | :------------------------------------------------------------------ | :------: |
| key             | 唯一键值                                                            |    是    |
| titleKey        | 菜单标题                                                            |    是    |
| pic             | 菜单图片                                                            |    否    |
| link            | 路由链接地址                                                        |    是    |
| children        | 子路由                                                              |    否    |
| supportModes    | 支持的模式(路由，中继，桥)，不存在则全支持                          |    否    |
| supportMeshRole | 支持的mesh角色(关闭，controller，agent)，不存在则全支持             |    否    |
| supportAbility  | 能量级是否支持此数据由后台返回，不存在则支持                        |    否    |
| supportProducts | 支持的产品(AC1200,AX1500,AX1800),当前版本已舍弃，通过后台能力集管控 |    否    |
| component       | 对应的页面组件                                                      |    否    |

#### 能力集

功能介绍：通过后台控制，根据返回值来显示是否需要某些功能

相关文件:

`/src/IData/systemInfo.d.ts`: 定义能力集字段
`/src/layouts/layout02/AuthedApp/routesData.tsx`: 设置能力集功能
`/src/layouts/layout02/AuthedApp/RoutesAbilitys.ts`: 获取父级能力集显示问题

能力集流程：

1. 用户进入登录页面，调用获取系统信息接口，获取到能力集，将其存放至sessionStorage
2. 用户进入主页面。从sessionStorage获取能力集，进行路由数据渲染。
3. 根据渲染好的路由数据进行页面渲染，不支持的功能不做显示

#### 菜单显隐控制函数

涉及文件: `src/layouts/layout02/AuthedApp/provider/MenuStateProvider.tsx` 和 `src/layouts/layout02/AuthedApp/provider/util.tsx`

`src/layouts/layout02/AuthedApp/provider/util.tsx`文件中`filterMenus`函数根据多个条件对菜单进行筛选，只有符合条件的菜单才会显示，目前筛选条件包括(路由器模式，mesh角色，后台能力集是否支持)

#### 调试登录页面

当前登录页面和功能主页面是两个不同的组件以及路由，所以调试登录页面是需要手动修改`/src/App.tsx`文件，如下：

```tsx
<SkinProvider>
  <div className="App">
    {/* prettier-ignore */}
    <ErrorBoundary fallbackRender={fullPageFallback}>
          {/* 添加!调试登录页面 */}
          {!auth?.user?.loginStatus? <AuthedApp /> : <UnauthedApp />}
        </ErrorBoundary>
  </div>
</SkinProvider>
```

`注意`：在提交代码的时候切记去除`!`

#### 本地新增调试接口

涉及文件: `__json_server_mock/db.json`，例如新加一个`api/system/user`接口:

```json
"user": {
  "data": {
    "name": "admin",
    "account": "admin-test"
  },
  "apiId": "system"
}
```

#### axios请求仓库封装与使用

涉及文件目录: `src/http`

目前封装了三个常用的方法:

`useGet`: 用于调用`get`请求的接口,示例：

```tsx
const { data, isSuccess, replay } = useGet<TR069INF>(tr069Url);
useEffect(() => {
  if (!isSuccess || !data) return;
  if (data.errCode === HttpStatus.OK) {
    form.setFieldsValue(data.data);
  }
}, [data, isSuccess, form]);
```

`postData`: 用于`post`请求的接口，示例

```tsx
const onFinish = async (data: TR069INF) => {
  loadingCtx.setLoading(true);
  try {
    await postData(tr069Url, { data });
    message.success(langs.comOperateingsuccess);
    replay();
  } finally {
    loadingCtx.setLoading(false);
  }
};
```

`rpcRequest`: 适用于项目中`RPC`规范的接口请求,示例

```tsx
const triggerVersionCheck = async () => {
  if (loadingCtx.loading) return;
  loadingCtx.setLoading(true);
  const res = await rpcRequest<RPCResponse<RPCResult>>(
    'triggerVersionCheck',
    url,
    {}
  );
  if (res.result.code === 0) {
    getCheckResult();
  } else {
    message.error(res.result.message);
  }
};
```

#### 多语言切换封装实现

涉及文件: `/src/context/languageContext.tsx` 和 `/src/provider/LanguageProvider.tsx`

实现方案: 通过react自带hooks `useContext` 和 `useReducer` 实现，通过useContext提供全局的provider,注入修改语言的方法和语言的的json数据，使用根据context的使用方法即可

使用示例:

```tsx
import { languageContext } from 'src/context';
const Tr069 = () => {
  const { langs } = useContext(languageContext);
  return <div>{langs?.Tr069Mune}</div>;
};
```

#### 添加语言翻译

1. 如果已存在对应的翻译文件，只需要在对应的文件里面添加内容，在页面使用即可
2. 如果需要新增一门语言翻译，则按以下操作(切记，所有语言翻译文件键值一定要保持完全一致，可执行`yarn run compareI18n`进行比较)：
   - 在`public/i18n`文件夹新增对应的语言文件
   - 在`/src/language.ts`文件新增对应的语言选项，字段说明如下：
     | 字段 | 含义 | 是否必须 |
     | :----- | :--- | :------ |
     | display|显示的内容|是|
     |value|选择语言值，需要和语言文件名保持一致|是|
     |antdlangs|antd组件语言，需要从antd仓库引入|是|
3. 语言也支持后台定制，根据`deviceInfo`接口返回的`preInfo.multiLanguage`字段设置

#### 心跳接口

说明: 由后台提供的一个检测session是否过期的的接口，此接口本身不会刷新session的过期时间，前端通过全局provider注入

相关文件：`/src/provider/HeartbeatProvider.tsx`。

提供: `setStop`方法和`stop`状态，可通过`setStop`方法可设置是否调用心跳接口来实现后台重启网络时，心跳接口调用报错的问题

#### 全局load动画

说明: 设置全局load状态的显示与隐藏

相关文件: `/src/provider/LoadingProvider.tsx`

提供: `setLoading`方法来设置loading的显示与隐藏，常用用于页面加载与数据保存

示例:

```tsx
import { loadingContext } from 'src/provider';
const Tr069 = () => {
  const loadingCtx = useContext(loadingContext);
  loadingCtx.setLoading(true);
  return <>tr069</>;
};
```

### 项目命令说明

```shell
# 运行布局一(暂时未使用)
yarn run start01
# 运行布局二
yarn run start02
# 编译布局一(暂时未使用)
yarn run build01
# 编译布局二
yarn run build02
# 运行本地mock接口服务
yarn run db-json
# 比较翻译文件内容
yarn run compareI18n
```

# 海思原生代码本地调试

1. 安装vscode
2. 打开vscode，安装Live Server扩展插件
3. 使用vscode打开海思前端代码
4. 修改模式为dubug模式(`切记提交代码时这个修改不能提交`)。`files/web_pages/script/init.js`:

```js
nc.init(
  {
    debug: true // 修改此处为true，打开debug模式
    // 省略其他配置
  },
  initMenu
);
```

5. 修改`files/web_pages/index.html`跳过登录接口调用，直接跳转至首页(`切记提交代码时这个修改不能提交`):

```js
// 放开以下两行代码
window.location = './index_content.html?noned=' + nonedatav;
return;
```

6. 添加对应的调试数据，`files/web_pages/script/debug.js`中添加调试的假数据。根据后台定义的数据接口添加内容(请根据具体的业务实现定义内容)，例如后台接口返回如下结构：

```json
{
  "retcode": 0,
  "data": {
    "hgw_topo_data": {
      "name": "XGPON-master",
      "children": [
        {
          "name": "GPON-slave1",
          "children": []
        }
      ]
    }
  }
}
```

- 在debug.js中添加

```js
'hgw_topo_data':{"name":"XGPON-master","children":[{"name":"GPON-slave1","children":[]}]}
```

- 也可以直接在接口处直接把数据直接写死(`写死的数据在提交时需要删除，切勿提交至版本库`)，例如`files/web_pages/script/EM_Status_action.js`中，`init_EasyMesh_Status_set`方法：

```js
function init_EasyMesh_Status_set() {
  EmStatusStyle();
  sendRequest('easymesh_ctrl_topology_show', { no: 'no' }, function (data) {
    // 此处将返回数据写死，相当于假数据
    data =
      '{"retcode":"0","data":{"al_mac_addr":"a6:cd:0b:7c:9e:53","dev_role":"0","uplink_type":"0","oper_state":"0","active_time":"286","intf_num":"1","dev_intf_list":[{"intf_mac_addr":"a6:cd:0b:7c:9e:53","intf_name":"veth0","media_type":"1"}],"non_i1905_nb_list":[],"non_i1905_nb_num":"0","uplink_rate":"0","downlink_rate":"0","bhtype":"0","bhalmac":"00:00:00:00:00:00","children":[{"al_mac_addr":"08:10:74:63:00:60","dev_role":"1","uplink_type":"0","oper_state":"0","active_time":"229","intf_num":"6","dev_intf_list":[{"intf_mac_addr":"08:10:74:63:03:60","intf_name":"","media_type":"1"},{"intf_mac_addr":"b6:f2:c1:7c:3b:aa","intf_name":"","media_type":"1"}],"non_i1905_nb_list":[{"local_intf_mac":"08:10:74:63:03:60","nb_intf_mac":"f8:e4:3b:b9:a7:de"}],"non_i1905_nb_num":"1","uplink_rate":"1000","downlink_rate":"1000","bhtype":"0","bhalmac":"a6:cd:0b:7c:9e:53"}]}}';
    try {
      if (data == '2') {
        alert('页面数据调用失败！');
      }
      data = eval('(' + data + ')');
      if (data.data) {
        if (data.retcode == '1') {
          alert('页面数据调用失败！');
        }
        data = data.data;
      }
    } catch (e) {}
    easymeshtopoData = topoData(data);
    topoCreate('EasyMesh_topo', easymeshtopoData);
  });
}
```

7. 打开调试页面，右键点击`files/web_pages/index.html`文件，选择`Open with Live Server`,等待几秒中即可在浏览器自动打开页面，此时正常登录页面即可进行调试
