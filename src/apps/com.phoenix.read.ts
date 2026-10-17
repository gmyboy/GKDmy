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
          matches: '[text="上滑继续观看短剧"][visibleToUser=true]',
          snapshotUrls: 'https://i.gkd.li/i/32430183', //A
          excludeSnapshotUrls: 'https://i.gkd.li/i/32430193', //A 倒计时未结束
          exampleUrls: 'https://e.gkd.li/248c4c7b-469c-459b-a489-23c123f35766',
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
