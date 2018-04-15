$(function () {
    var uploadVideoInst = Helper.upload.render({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            'X-SESSION-TOKEN' :$('meta[name="session-token"]').attr('content')
        },
        size:'2048',
        accept : 'video',
        elem: '#videoBtn',
        field: 'video',
        url : '/upload',
        done : function (res) {
            if (res.code === 1){
                $('video').prop('controls', 'controls');
                $('video').prop('src', res.data.url);
                $('video').data('video-id', res.data.media_id);
            }
        }
    });

    var index = 0
    var uploadImageInst = Helper.upload.render({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            'X-SESSION-TOKEN' :$('meta[name="session-token"]').attr('content')
        },
        accept: 'images',
        elem : '#imageBtn',
        field: 'image',
        url : '/upload',
        multiple:true,
        number:5,
        before: function(){
            index = 0;
            $('.img-list').find('img').removeProp('src');
        },
        done : function (res) {
            $('.img-list').find('img').eq(index).data('image-id', res.data.media_id);
            $('.img-list').find('img').eq(index).prop('src', res.data.url);
            index++;
        },
        error:function (index, upload) {
            console.log(upload)
        }
    });
    
    mui('body').on('tap', '#cityBtn', function () {
        Ajax.get_city({}, function (res) {
            if (res.code === 1){
                var cities = res.data;
                var data = []
                $.each(cities, function (i, v) {
                    var city = {text : v.city_name, value : v.id};
                    if (v.children.length > 0){
                        city.children = [];
                        $.each(v.children, function (i, v) {
                            city.children.push({text : v.city_name, value : v.id})
                        })
                    }
                    data.push(city);
                })

                var picker = new mui.PopPicker({layer: 2, buttons:['cancle','ok']});
                picker.setData(data);
                picker.pickers[0].setSelectedIndex(0);
                picker.pickers[1].setSelectedIndex(0);
                picker.show(function(SelectedItem) {
                    $('#parent_city').data('city_id', SelectedItem[0].value).text(SelectedItem[0].text)
                    $('#sub_city').data('city_id', SelectedItem[1].value).text(SelectedItem[1].text)
                })
            }

        })
    });

    mui('body').on('tap', '#submit', function () {
        var media = []
        var video = $('video').data('video-id');

        if (video){
            media.push(video);
        }

        $('.img-list').find('img').each(function(){

            if ($(this).data('image-id')){
                media.push($(this).data('image-id'));
            }
        });

        media = media.join('|');
        var title = $('input[name="title"]').val();
        var content = $('textarea[name="content"]').val()
        Ajax.submit_post_ad({
            media_ids : media,
            title : title,
            content:content,
            parent_city_id : $('#parent_city').data('city_id'),
            sub_city_id : $('#sub_city').data('city_id')
        }, function (res) {
            if (res.code === 1){
                Helper.redirect('/index');
            } else {
                mui.alert(res.msg, 'Alert', 'ok');
            }
        })
    });
})