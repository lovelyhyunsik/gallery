const $container=$('.gallery'); //이미지들을 감싸는 겔러리
const $loadMoreBtn=$('.load-more'); //더보기버튼
let $addItemCount=8; //클릭할때 나올 이미지 갯수
let $added=0;//처음보이는 것 리스트 항복 모두 로드하면 버튼이 사라지게 할 용도
let $allData = [];

// $.getJSON(파일경로, 함수);
$.getJSON('./data/content.json', function(data){
    initGallery(data);
});

$container.masonry({
    // options
    itemSelector: '.gallery-item',
    columnWidth: 210,
    gutter:30
  });

function initGallery(data){
    $allData=data;
    //console.log($allData);
    addItem();
    $loadMoreBtn.click(function(){
        addItem();
    });
};
function addItem(){
    let elements=[];
    let slicedDate;
    slicedDate=$allData.slice($added, $added += $addItemCount);
    $.each(slicedDate, function(idx, item){
        let itemHTML=
        '<li class="gallery-item">' +
            '<a href="'+item.images.large+'">' +
                '<figure>' +
                    '<img src="'+item.images.thumb+'" alt="'+item.title+'">' +
                    '<figcaption>'+item.title+'</figcaption>'+
                '</figure>'+
            '</a>'+
        '</li>';
        elements.push($(itemHTML).get(0))
    })
    $container.append(elements);
    $added +=slicedDate.length;

    if($added < $allData.length){
        $loadMoreBtn.show()
    }else{
        $loadMoreBtn.hide()
    }

    $container.imagesLoaded( function() {
        $container.masonry('appended', elements);
    });
}