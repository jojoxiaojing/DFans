"use strict";
//登录功能

// numOfTokens

function login() {
    
    login_qrimage();
    
   

    
    
//    var alt = check_qrid(qrid);
//    //TODO check alt and do loop
//    
//    var token = login_check(alt);
//    var num = localStorage.numOfTokens;
//    if(num == undefined){
//        num = 0;
//    }
//    var nameOfNewToken = "token" + toString(num+1);
//    localStorage[nameOfNewToken] = token;  
    
    //helper function of login
    function login_qrimage() {
        var result=["",""];
        try{
            var url="http://login.sina.com.cn/sso/qrcode/image?entry=weibo&size=180&callback=STK";
            $.ajax({
                url: url,
                type: "GET",
//                beforeSend: function(xhr){
//                    xhr.setRequestHeader("Host","login.sina.com.cn");
//                    xhr.setRequestHeader("Accept-Encoding","deflate");
//                    xhr.setRequestHeader("Accept","*/*");
//                    xhr.setRequestHeader("Connection","keep-alive");
//                    xhr.setRequestHeader("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 Weibo (iPhone5,2__weibo__7.6.0__iphone__os10.3.2)");
//                },
                success: function(resp) { 
                    var reg = /\((.+)\)/;
                    var resp2 = resp.match(reg);
                    var resp3 = resp2[1];
                    var info = JSON.parse(resp3); 
                    var sqr_url = info["data"]["image"];
                    $(".qr_img").attr("src",sqr_url); 
                    var qrid = info["data"]["qrid"];
                    check_qrid_timer(qrid);                   
                }
            });
        }
        catch(err){
            console.log(err);
        }
    }
    
    function check_qrid_timer(qrid) {
        var myInterval = setInterval(function(){check_qrid(qrid,myInterval)}, 100);
    }

    function check_qrid(qrid,myInterval) { 
        var url = "http://login.sina.com.cn/sso/qrcode/check?entry=weibo&qrid="+qrid+"&callback=ST";
        $.ajax({
            url:url,
            type:"GET",
            success:function(resp){
                var reg = /\((.+)\)/;
                var resp2 = resp.match(reg);
                var resp3 = resp2[1];
                var info = JSON.parse(resp3);
                console.log(info["retcode"]);
                if(info["retcode"]==50114002){
                    $(".info_qr").html("手机已扫描，等待手机点确认键");
                }if(info["retcode"]==50114003){
                    $(".info_qr").html("二维码已经过期，需要刷新二维码");
                }
                
                if(info["data"] != undefined){
                    var alt=info["data"]["alt"];
                    if(alt != undefined){
                        
                        check_alt(alt);
                        clearInterval(myInterval);
                    }
                }
                
                              
            }
        })
    }
    
    function check_alt(alt) {
        var result=["",""];
        var url = "http://45.63.107.115:5123/mobilelogin?alt="+alt;
        
        
        
        $.ajax({
            url:url,
            type:"GET",
            success:function(resp){
                var reg = /\((.+)\)/;
                var resp2 = resp.match(reg);
                var resp3 = resp2[1];
                var info = JSON.parse(resp3);
                console.log(info);
                var n = localStorage.numOfAccs
                if(n == undefined){ n = 0; }
                n = n + 1;
                localStorage.numOfAccs = n;
                var acc = "acc" + n.toString();
                localStorage[acc] = JSON.stringify(info);
            }
        })
    }
}

//get account information

function getAccInfo(acc) {
    var accinfo = JSON.parse(acc);
    var UID = accinfo.uid;
    var SVALUE = accinfo.svalue;
    var GSID = accinfo.gsid;
    var url = "https://api.weibo.cn/2/users/show?networktype=wifi&wm=3333_2001&i=c662fe8&sflag=1&b=1&skin=default&c=iphone&v_p=26&v_f=1&lang=zh_CN&from=1057193010&ua=&aid=&sourcetype=&has_profile=1&has_extend=1&uid=" + UID + "&s=" + SVALUE + "&gsid=" + GSID;
    console.log(url);
    $.ajax({
        url:url,
        type:"GET",
        success:function(resp){
            console.log(resp);
            
// {id: 2622749755, idstr: "2622749755", screen_name: "伟岸小王子", name: "伟岸小王子", province: "37"…}add_top_follow_card: 0avatar_hd: "https://tva1.sinaimg.cn/crop.0.0.180.180.1024/9c53fc3bjw8f13lq7j1qdj20500500sl.jpg"avatar_large: "https://tva1.sinaimg.cn/crop.0.0.180.180.180/9c53fc3bjw8f13lq7j1qdj20500500sl.jpg"badge: Objectali_1688: 0anniversary: 0bind_taobao: 0dailv: 0daiyan: 0discount_2016: 0dzwbqlx_2016: 0enterprise: 0follow_whitelist_video: 0fools_day_2016: 0gongyi: 0gongyi_level: 0league_badge: 0lol_msi_2017: 0olympic_2016: 0self_media: 0suishoupai_2017: 0super_star_2017: 0taobao: 0uc_domain: 0uefa_euro_2016: 0unread_pool: 1unread_pool_ext: 1video_attention: 0vip_activity1: 0vip_activity2: 0zongyiji: 0__proto__: Objectbirthday: ""city: "1000"cover_image_phone: "https://ww1.sinaimg.cn/crop.0.0.640.640.720/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg"created_at: "Sat Feb 11 11:36:30 +0800 2012"credit_score: 80description: "d-fans测试号，勿动"domain: ""email: ""extend: Objectfavourites_count: 0follow_me: falsefollowers_count: 129following: falsefriends_count: 154gender: "女"id: 2622749755idstr: "2622749755"insecurity: Objectis_new: 0lang: "zh-cn"level: 1mbrank: 0mbtype: 0msn: ""name: "伟岸小王子"pic_bg: ""profile_image_url: "https://tva1.sinaimg.cn/crop.0.0.180.180.50/9c53fc3bjw8f13lq7j1qdj20500500sl.jpg"province: "37"ptype: 0qq: ""remark: ""screen_name: "伟岸小王子"star: 0status: Objectstatuses_count: 932story_read_state: -1switch_unread_feed: 1type: 1urank: 35url: ""verified: falseverified_reason: ""verified_type: -1weihao: ""__proto__: Object
        }
    })
      
        

}


//抡博功能实现
function forwardWeibo(acc,id) {
    var accinfo = JSON.parse(acc);
    var UID = accinfo.uid;
    var SVALUE = accinfo.svalue;
    var GSID = accinfo.gsid;
    var url = 'https://api.weibo.cn/2/statuses/repost?gsid=' +GSID+'&wm=3333_2001&i=d10c7a8&b=1&from=1076293010&c=iphone&networktype=wifi&v_p=48&skin=default&v_f=1&s='+SVALUE + '&lang=en_US&sflag=1&ua=iPhone8,4__weibo__7.6.2__iphone__os10.1.1&ft=0&aid=&id='+id;
    console.log(url);
    $.ajax({
        url:url,
        type:"POST",
        success:function(resp){
            console.log(resp);
        }
})}

function deleteWeibo(acc,id) {
    var accinfo = JSON.parse(acc);
    var UID = accinfo.uid;
    var SVALUE = accinfo.svalue;
    var GSID = accinfo.gsid;
    var url = 'https://api.weibo.cn/2/statuses/destroy?gsid='+GSID+'&wm=3333_2001&i=d10c7a8&b=1&from=1076293010&c=iphone&networktype=wifi&v_p=48&skin=default&v_f=1&s='+SVALUE+'&lang=en_US&sflag=1&ua=iPhone8,4__weibo__7.6.2__iphone__os10.1.1&ft=0&aid=&id='+id;
     console.log(url);
    $.ajax({
        url:url,
        type:"POST",
        success:function(resp){
            console.log(resp);
        }
})
}

//控评功能实现
function likeComment(acc,id) {
    var accinfo = JSON.parse(acc);
    var UID = accinfo.uid;
    var SVALUE = accinfo.svalue;
    var GSID = accinfo.gsid;
    var url='http://api.weibo.cn/2/like/update?networktype=wifi&wm=3333_2001&i=c662fe8&sflag=1&b=1&skin=default&c=iphone&v_p=26&v_f=1&lang=zh_CN&s=' +SVALUE + '&from=1057193010&ua=iPhone5,2__weibo__5.7.1__iphone__os7.1.2&gsid=' + GSID +'&aid=&object_type=comment&object_id='+id;
    console.log(url);
    $.ajax({
        url:url,
        type:"GET",
        success:function(resp){
            console.log("success like");
        }})
}

//举报功能实现
function reportWeibo() {
    
}

//投票功能实现
function voteWeibo() {
    
}

//关注超话
function createFriendshipPage(acc) {
    var accinfo = JSON.parse(acc);
    var UID = accinfo.uid;
    var SVALUE = accinfo.svalue;
    var GSID = accinfo.gsid;
    var url = 'https://api.weibo.cn/2/friendships_pages/create?gsid='+GSID+'&wm=3333_2001&i=d10c7a8&b=1&from=1076293010&c=iphone&networktype=wifi&v_p=48&skin=default&v_f=1&s='+SVALUE+ '&lang=en_US&sflag=1&ua=iPhone8,4__weibo__7.6.2__iphone__os10.1.1&ft=0&aid=&moduleID=pagecard&uicode=10000011&featurecode=10000085&id=1022%3A100808237347456f0169aa3c4843505d877bc2&luicode=10000003&count=20&fid=100808237347456f0169aa3c4843505d877bc2&lfid=100103type%3D1%26q%3D%E8%BF%AA%E4%B8%BD%E7%83%AD%E5%B7%B4%26t%3D0&page=1';
    console.log(url);
    $.ajax({
        url:url,
        type:"GET",
        success:function(resp){
            console.log(resp);
        }})
}

//超话签到功能实现
function chaohuaSign(acc) {
    var accinfo = JSON.parse(acc);
    var UID = accinfo.uid;
    var SVALUE = accinfo.svalue;
    var GSID = accinfo.gsid;
    var url = 'https://api.weibo.cn/2/page/button?gsid='+GSID+'&wm=3333_2001&i=d10c7a8&b=1&from=1076293010&c=iphone&networktype=wifi&v_p=48&skin=default&v_f=1&s='+SVALUE+'&lang=en_US&sflag=1&ua=iPhone8,4__weibo__7.6.2__iphone__os10.1.1&ft=0&aid=&moduleID=pagecard&since_id=4128044526354644&featurecode=10000001&uicode=10000011&luicode=10000001&count=15&request_url=http%3A%2F%2Fi.huati.weibo.com%2Fmobile%2Fsuper%2Factive_checkin%3Fpageid%3D100808237347456f0169aa3c4843505d877bc2&fid=100808237347456f0169aa3c4843505d877bc2&lfid=100016161431481&page=1';
    $.ajax({
        url:url,
        type:"GET",
        success:function(resp){
            console.log(resp);
        }})
}



//goToPage functions
function hideAll(){
    $(".setting-page").css("display","none");
    $(".announce-page").css("display","none");
    $(".login-page").css("display","none");
    $(".yingyuan-page").css("display","none");
    $(".tabbar").css("display","none");
}

function goLoginPage() {
    hideAll();
    $(".login-page").css("display","");
    
}

function goSettingPage() {
    hideAll();
    $(".setting-page").css("display","");
    $(".tabbar").css("display","");
}

function goAnnouncePage() {
    hideAll();
    $(".announce-page").css("display","");
    $(".tabbar").css("display","");
}

function goYingYuanPage() {
    hideAll();
    $(".yingyuan-page").css("display","");
    $(".tabbar").css("display","");
    $(".yingyuan").css("height",$(".yingyuan").css("width"));
    var m = ($(".yingyuan").height())*0.5 - ($(".intext").height())*0.5;
    $(".intext").css("margin-top",m);
}