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
  ],
});
