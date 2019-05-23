$(document).ready(function () {
    var apple={
        amount:10,
        soldout:false,
        ordered:0,
    }
    var goods={
        total:0,
    }
    timer(70);
    
    
    function count(num){
        if(num==1&&goods.total<apple.amount){
            goods.total++;
        }
        else if(num==-1&&goods.total>0){
            goods.total--;
        }
        else if(num==1&&apple.soldout==true&&goods.total<99){
            goods.total++;
        }
        else if(num==-1&&apple.soldout==true){
            goods.total++;
        }
        $(".sum").html(goods.total);
    }
    $(".add").click(function (e) { 
        e.preventDefault();
        count(1);
    });
    $(".reduce").click(function (e) { 
        e.preventDefault();
        count(-1)
    });
    function timer(time){
        $(".sum").html(goods.total);
        $(".amount").html("剩餘數量:"+apple.amount)
        var count = time;
        $(".time").html('倒數時間:').append(count);
        if(time>0){
            setTimeout(() => {
                (count>60)?(borderColor('green')):(borderColor('orange'));
                count--;
                timer(count);
            }, 1000);
        }
        else if(time==0){
            borderColor('gray')
            $(".button").css("display","none");
            $(".stop").css("display","block");
            $(".close").click();
        }
    }
    function borderColor(color){
        $(".time").css({"border":"3px solid","border-color":color});
    }
    $(".close").click(function(){
        $(".box").css("display","none");
    })
    $(".button").click(function(){
        $(".box").css("display","block")
        if(apple.amount==0){
            $(".action").html("我要預購");
            apple.soldout=true;
        }
    })
    $(".confirm").click(function () {
        if(goods.total<=apple.amount){
            apple.amount-=goods.total;
            goods.total=0;
            $(".amount").html("剩餘數量:"+apple.amount)
        }
        else if(apple.amount==0){
            apple.ordered+=goods.total;
            goods.total=0;
            $(".preorder").html("預購數量:"+apple.ordered)
        }
        $(".close").click();
        
    })
    
});