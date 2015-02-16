/**
 * Created by gillesdanjou on 15/02/15.
 */
try {
var image;
    image = $('.infobox img')[0].src;
//console.log('erere')
var imageTitle = $('#firstHeading').text();
var bubble = 'img/wikipedia.png';
var text = $('#mw-content-text > p').text().split('.');
var summary = '', i = 0;
while (summary.length < 500) { summary += text[i++]; }
//
//var text = $('#mw-content-text > p');
//
//summary = text[0].text() + text[1].text() + text[2].text();
//
//result = {
//    'info': {
//        'image': image,
//            'imageTitle': imageTitle,
//            'bubble': bubble,
//            'link1': {
//            'label': '@wikipedia',
//            'uri': window.location.href
//        },
//        'comment': 'Maybe a good idea to visit...',
//        'title': 'A must have in your hollydays:',
//        'summary': summary
//    }
//};

 result = {
    'info': {
        'image':  '' + image,
        'imageTitle': imageTitle,
        'bubble': bubble,
        'link1': {
            'label': '@stephen_doe',
            'uri': '#'
        },
        'comment': 'Web and Graphic designer',
        'title': 'Consectetur adipisicing',
        'summary': summary
    }
}

}  catch(err) {
    console.log(err.message);
}