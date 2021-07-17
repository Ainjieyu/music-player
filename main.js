var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList: [],
        musicUrl: "",
        // 歌曲封面
        musicCover: '',
        // 热门评论
        hotComments: [],
        // 播放状态
        isPlaying: false,
    },
    methods: {
        // 搜索歌曲
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function(response) {
                    that.musicList = response.data.result.songs;
                    console.log(response.data.result.songs);
                }, function(err) {

                })
        },
        // 播放歌曲
        playMusic: function(MusicId) {
            var that = this;
            // console.log(MusicId);
            axios.get("https://autumnfish.cn/song/url?id=" + MusicId)
                .then(function(response) {
                    crossDomain: true,
                    // console.log(response);
                    console.log(response.data.data[0].url)
                    that.musicUrl = response.data.data[0].url;
                }, function(err) {})
                // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + MusicId)
                .then(function(response) {
                    console.log(response.data.songs[0].al.picUrl);
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function(err) {})
                // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + MusicId)
                .then(function(response) {
                    console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments;
                }, function(err) {})
        },
        play: function() {
            // console.log("play");
            this.isPlaying = true;
        },
        pause: function() {
            // console.log("pause");
            this.isPlaying = false;
        },
        // 播放mv
        // playMv: function(mvid) {
        //     axios.get("https://autumnfish.cn/mv/url?id" + mvid)
        //         .then(function(response) {
        //             console.log(response.data.data.url);
        //         }, function(err) {})
        // }

    }
})
