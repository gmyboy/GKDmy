import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.phoenix.read',
  name: '红果免费短剧',
  groups: [
    {
      key: 1,
      name: '功能类-自动[上滑]继续看短剧',
      desc: '①读秒结束后[上滑]',
      fastQuery: true,
      activityIds: [
        'com.dragon.read.component.shortvideo.impl.ShortSeriesActivity', //A
        'com.dragon.read.component.shortvideo.impl.fullscreen.ShortSeriesLandActivity', //B 横屏
        'com.dragon.read.pages.main.MainFragmentActivity', //C
      ],
      rules: [
        {
          key: 1,
          name: '①读秒结束后[上滑]',
          matchRoot: true,
          swipeArg: {
            start: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.7',
            },
            end: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.3',
            },
            duration: 200, //滑动时长
          },
          matches:
            '[text="上滑继续观看短剧" || text="上滑继续观看剧集"][visibleToUser=true]',
          snapshotUrls: 'https://i.gkd.li/i/32430183', //A
          excludeSnapshotUrls: 'https://i.gkd.li/i/32430193', //A 倒计时未结束
          exampleUrls: 'https://e.gkd.li/248c4c7b-469c-459b-a489-23c123f35766',
        },

        {
          key: 2,
          name: '②5秒[上滑]1次',
          actionCd: 4000,
          actionDelay: 1000, //防止自动切集的过程中误触
          versionCode: { maximum: 72932 }, // 排除版本大于 7.2.9.32 的
          swipeArg: {
            start: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.7',
            },
            end: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.3',
            },
            duration: 200,
          },
          excludeMatches: [
            '[text*="后可继续上滑观看" || text*="秒后可继续上滑"][visibleToUser=true]',
            '([text="选集"][visibleToUser=true]) || ([text*="剧备字"][height>0])',
            '[vid="root_view"][visibleToUser=false][width=0] <n FrameLayout + FrameLayout[visibleToUser=true] >2 ComposeView[visibleToUser=true]', // 播放页已隐藏，相邻详情页可见
          ],
          matches: '[text="选集"][visibleToUser=false]',
          snapshotUrls: [
            'https://i.gkd.li/i/32429827', //A [直播间]
            'https://i.gkd.li/i/32429877', //B 横屏
            'https://i.gkd.li/i/32429830', //C [游戏]
          ],
          excludeSnapshotUrls: [
            'https://i.gkd.li/i/32430107', //A 显示[选集]时,停止匹配
            'https://i.gkd.li/i/32434872', //B 横屏 [网微剧备字] 当前视频存在备案号时(即表示不是广告),停止匹配
            'https://i.gkd.li/i/32683026', //B 横屏 同上
            'https://i.gkd.li/i/33193929', //B 横屏 [微短剧备字]
            'https://i.gkd.li/i/33596860', // 短剧详情/剧评页
          ],
          exampleUrls: [
            'https://e.gkd.li/0128820c-4e8d-44ed-9ebc-ef2d5a062e26',
            'https://e.gkd.li/b70813b8-1377-4210-be6c-fe04f3c9c701',
            'https://e.gkd.li/38c5c9d1-9962-4e07-a7de-49999d3ddf2b',
          ],
        },

        // 作为 key2 的补充, 即 7.2.9.32 以上的版本由key3负责
        {
          key: 3,
          name: '③竖屏5秒[上滑]1次',
          matchRoot: true, // 从根节点定位播放容器，避免广告子节点事件导致漏匹配
          actionCd: 4000,
          actionDelay: 1000,
          versionCode: { minimum: 72933 }, // 排除版本小于等于 7.2.9.32 的
          swipeArg: {
            start: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.7',
            },
            end: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.3',
            },
            duration: 200,
          },
          excludeMatches: [
            '[text*="后可继续上滑观看" || text*="秒后可继续上滑"][visibleToUser=true]',
            '([text="选集"][visibleToUser=true]) || ([text*="剧备字"][height>0])',
            '@TextView[visibleToUser=false][width>2000][height>40] <8 [childCount=8] <<n [vid="fragment_container"]',
            '[vid="root_view"][visibleToUser=false][width=0] <n FrameLayout + FrameLayout[visibleToUser=true] >2 ComposeView[visibleToUser=true]', // 播放页已隐藏，相邻详情页可见
          ],
          matches:
            '[text="选集"][visibleToUser=false] <<n [vid="root_view"][visibleToUser=true][width>0]',
          snapshotUrls: [
            'https://i.gkd.li/i/33599385', // 竖屏广告
          ],
          excludeSnapshotUrls: [
            'https://i.gkd.li/i/32683026', // v7.2.9.32 ,全屏时,还存在可快查的备案号节点 [text*="剧备字"][height>0]
            'https://i.gkd.li/i/33289353', // v7.3.9.32 ,全屏时,该备案号节点 [text=null]
            'https://i.gkd.li/i/33599318', // 横屏正常短剧，无可见广告标识
            'https://i.gkd.li/i/33596860', // 短剧详情/剧评页
          ],
        },
        {
          key: 4,
          name: '④横屏读秒结束后[上滑]',
          activityIds:
            'com.dragon.read.component.shortvideo.impl.fullscreen.ShortSeriesLandActivity',
          matchRoot: true,
          forcedTime: 2147483647, // 横屏倒计时不一定发送无障碍事件，保持主动查询
          actionCd: 4000,
          actionDelay: 1000,
          versionCode: { minimum: 72933 },
          swipeArg: {
            start: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.7',
            },
            end: {
              x: 'screenWidth/2',
              y: 'screenHeight * 0.3',
            },
            duration: 200,
          },
          excludeMatches: [
            '([text="选集"][visibleToUser=true]) || ([text*="剧备字"][height>0])',
            '@TextView[visibleToUser=false][width>2000][height>40] <8 [childCount=8] <<n [vid="fragment_container"]',
            '[vid="root_view"][visibleToUser=false][width=0] <n FrameLayout + FrameLayout[visibleToUser=true] >2 ComposeView[visibleToUser=true]',
          ],
          // 提示文字未暴露到节点；结束时提示框宽高比约 4.94，读秒时约 4.84。
          // 使用比例适配缩放，并限定在横屏播放容器中广告标识左侧的提示框。
          matches:
            '[desc="广告"][visibleToUser=true] < ViewGroup[childCount=2] - ViewGroup[childCount=0][text=null][desc=null][visibleToUser=true][width.times(10)>height.times(49) && width<height.times(5)] <<n [vid="fragment_container"][width>height]',
          snapshotUrls: [
            'https://i.gkd.li/i/33599339',
            'https://i.gkd.li/i/33599958',
            'https://i.gkd.li/i/33897985',
          ],
          excludeSnapshotUrls: [
            'https://i.gkd.li/i/33898204', // 倒计时未结束
            'https://i.gkd.li/i/32683026',
            'https://i.gkd.li/i/33289353',
            'https://i.gkd.li/i/33599318',
            'https://i.gkd.li/i/33596860',
          ],
        },
      ],
    },
    {
      key: 2,
      name: '局部广告-视频左下角卡片',
      desc: '点击广告卡片右上角的关闭按钮',
      fastQuery: true,
      matchRoot: true,
      activityIds:
        'com.dragon.read.component.shortvideo.impl.fullscreen.ShortSeriesLandActivity',
      rules: [
        {
          // 关闭区域及其子节点均不可点击，使用中心坐标点击。
          // 从视频容器定位当前播放页末尾的广告卡片，避免依赖混淆 ID。
          action: 'clickCenter',
          matches:
            '@ViewGroup[childCount=2][getChild(0).childCount=0 && getChild(1).childCount=0][visibleToUser=true] < ViewGroup[childCount=1] < ViewGroup[childCount=1] <<n FrameLayout[childCount=1][index=parent.childCount.minus(1)] <n FrameLayout <3 FrameLayout[childCount=3] <<n [vid="fragment_container"]',
          snapshotUrls: 'https://i.gkd.li/i/33588067',
        },
      ],
    },
  ],
});
