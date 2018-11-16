import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from '../model/post.model';
import { PostContent } from '../model/postContent.model';
import { Category } from '../model/category.model';
import { Comment } from '../model/comment.model';

@Injectable({ providedIn: 'root' })
export class PostViewService {
    HOST: String = 'http://localhost:7979/';

    constructor(private http: HttpClient) { }

    // temp data here
    posts: Post[] = [
        new Post(
            null,
            new Date('2018-11-16'), // createdTime: Date
            new Date('2018-11-16'), // approvedTime: Date
            ['Món ngon', 'Đặc sản', 'Núi', 'Suối', 'Cắm trại'], // tags: Array<string>
            [
                new PostContent(
                    'Hang Sơn Đoòng',
                    'Được phát hiện vào năm 1991, Sơn Đoòng là hàng động tự nhiên lớn nhất thế giới.'
                    + ' Nó có cả một hệ sinh thái riêng bên trong với sông và rừng.',
                    'http://streaming1.danviet.vn/upload/2-2018/images/2018-04-11/2-1523420138-width650height365.jpg',
                    'Hình ảnh hang Sơn Đoòng'),
                new PostContent(
                    'Sa Pa',
                    'Thị trấn miền núi của tỉnh Lào Cai thu hút những du khách thích tận hưởng không khí trong lành,'
                    + ' ngắm thác nước, ruộng bậc thang, khám phá rừng tre và đi bộ leo núi.'
                    + ' Nơi đây có đỉnh núi cao nhất Việt Nam, Phan Xi Păng, với độ cao 3.143 m.',
                    'http://streaming1.danviet.vn/upload/2-2018/images/2018-04-11/3-1523420138-width650height365.jpg',
                    'Hình ảnh Sa Pa'),
                new PostContent(
                    'Cao nguyên đá Đồng Văn',
                    'Cao nguyên đá Đồng Văn được UNESCO công nhận là công viên điạ chất toàn cầu,'
                    + ' cao nguyên đá Đồng Văn gây ấn tượng với các đỉnh núi đá vôi trên thung lũng xanh mướt.',
                    'http://streaming1.danviet.vn/upload/2-2018/images/2018-04-11/9-1523420138-width650height365.jpg',
                    'Hình ảnh cao nguyên đá Đồng Văn'),
                new PostContent(
                    'Thác Bản Giốc',
                    'Nằm giữa biên giới Việt Nam và Trung Quốc,'
                    + ' thác Bản Giốc được hình thành cách đây hàng nghìn năm. Dòng thác chính có độ cao 30m và rộng 300m.',
                    'http://streaming1.danviet.vn/upload/2-2018/images/2018-04-11/18-1523420138-width650height365.jpg',
                    'Hình ảnh Thác Bản Giốc')
            ], // postContents: Array<PostContent>
            '30 điểm đến đẹp nhất Việt Nam do CNN bình chọn', // title: string
            'http://streaming1.danviet.vn/upload/2-2018/images/2018-04-11/13-1523420138-width650height365.jpg', // cover: string
            'Huy Phong (theo CNN)', // authorId: string
            null, // location: Location
            [
                new Category('Du lịch', 'link', [''])
            ], // categories: Array<Category>: name, link, tags
            5, // rating: number from 0 to 5
            'PENDING', // status: string
            [
                new Comment(
                    null, new Date(),
                    'Nội dung comment 1, bài viết dở tệ, hình ảnh không đẹp. Đánh giá 1 sao',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Comment số 2, bài viết bổ ích, tks',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Thấy ít comment quá nên t gõ bậy góp vui',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    '....',
                    0, [], 'SHOW'
                )
            ], // comments: Array<Comment>: userId, time, content, numberLiked, userLiked, status
            'Bài viết này không cần mô tả, người xem thích thì vào tự đọc lấy.' // description: string
        ),
        new Post(
            null,
            new Date('2018-11-16'), // createdTime: Date
            new Date('2018-11-16'), // approvedTime: Date
            ['Món ngon', 'Đặc sản', 'Núi', 'Suối', 'Cắm trại'], // tags: Array<string>
            [
                new PostContent(
                    '',
                    'Thành phố Đà Nẵng nằm ở miền Trung Việt Nam với khoảng cách gần như chia đều giữa thủ đô Hà Nội và thành phố HCM. '
                    + 'Đà Nẵng còn là trung tâm của 3 di sản văn hóa thế giới là Cố đô Huế, phố cổ Hội An và thánh địa Mỹ Sơn. '
                    + 'Bắc giáp tỉnh Thừa Thiên – Huế, Tây và Nam giáp tỉnh Quảng Nam, Đông giáp Biển Đông. '
                    + 'Đà Nẵng nằm ở trung độ đất nước, trên trục giao thông Bắc – Nam về đường bộ, đường sắt, đường biển, '
                    + 'đường hàng không và điểm cuối của Hành lang Kinh tế Đông Tây trải dài từ Việt Nam, Lào, Thái Lan và Burma (Myanmar)'
                    + '\nThành phố có diện tích 1.256,53 km² gồm 06 quận (Hải Châu, Thanh Khê, Liên Chiểu, Ngũ Hành Sơn, Sơn Trà, Cẩm Lệ)'
                    + ' và 02 huyện Hòa Vang, huyện đảo Hoàng Sa.\nDân số: 1.029.000 người (theo điều tra dân số 2015)',
                    'https://danangfantasticity.com/wp-content/uploads/2015/10/bien-danang.jpg?x13634',
                    'Hình ảnh biển Đà Nẵng'),
                new PostContent(
                    '1. Đa dạng về cảnh quang thiên nhiên',
                    'Đà Nẵng là một thành phố biển với bãi biển dài hơn 60 km. Với bãi biển đẹp, trải dài thoai thoải '
                    + 'và cát trắng miên man, Biển Đà Nẵng được tạp chí Forbes của Mỹ bình chọn là 1 trong 6 bãi biển '
                    + 'quyến rũ nhất hành tinh. Ngụp lặn trong nước biếc, nô giỡn với những con sóng và tắm nắng trên bãi '
                    + 'cát trắng mịn đủ để mang lại cho bất kỳ ai cảm giác thư giản sau những giờ làm việc. Không những vậy, '
                    + 'có rất nhiều dịch vụ biển cho bạn trải nghiệm như canoing, dù kéo, lướt ván, chèo thuyền chuối, '
                    + 'motor nước, lặn biển ngắm san hô.',
                    'https://danangfantasticity.com/wp-content/uploads/2015/09/deo-hai-van-02-768x576.jpg',
                    'Hình ảnh núi'),
                new PostContent(
                    '',
                    'Không chỉ trứ danh bởi những bãi biển đẹp, Đà Nẵng cũng mang nét hấp dẫn riêng biệt bởi vị thế tựa '
                    + 'lưng vào dải Trường Sơn hùng vĩ, lại có bán đảo Sơn Trà vươn ra biển. Nhờ vậy, Đà Nẵng có con đèo '
                    + 'Hải Vân được mệnh danh “Thiên hạ đệ nhất hùng quang” với cảnh quang nhìn ra biển vô cùng ngoạn mục '
                    + 'và những khúc lượn hiểm trở. Từ ngày hầm đường bộ Hải Vân dài nhất Việt Nam được đưa vào sử dụng, '
                    + 'xe cộ lưu thông Bắc Nam dễ dàng và an toàn hơn trước và đèo Hải Vân dần trở thành điểm đến của những '
                    + 'người say mê thưởng ngoạn thiên nhiên hay cho những “cua rơ” muốn thử sức trên những con đèo dốc lượn.',
                    'https://danangfantasticity.com/wp-content/uploads/2016/03/Asia-Park01.jpg',
                    'Hình ảnh bánh xe mặt trời Đà Nẵng'),
                new PostContent(
                    '',
                    'Đà Nẵng còn có thương hiệu du lịch Bà Nà Hills. Được khám phá và xây dựng từ thời Pháp thuộc, '
                    + 'khu du lịch Bà Nà ngày càng hấp dẫn du khách với hệ thống cáp treo đạt 2 kỷ lục thế giới và '
                    + 'khu vui chơi giải trí trong nhà lớn nhất Đông Nam Á – Fantasy Park (Sun World Danang Wonders).',
                    'https://danangfantasticity.com/wp-content/uploads/2015/09/ba-na-hills-moutain-resort-08.jpg',
                    'Hình ảnh cáp treo Bà Nà Hills'),
                new PostContent(
                    '',
                    'Bà Nà nằm về phía Tây thành phố còn hướng về phía Đông Bắc, du khách tiếp tục khám phá bán đảo '
                    + 'Sơn Trà – khu rừng giữa thành phố với hệ động thực vật phong phú, với những bãi tắm hoang sơ mấp mô '
                    + 'ghềnh đá. Rồi ngược về Đông Nam lại là danh thắng Ngũ Hành Sơn, không chỉ chứa đựng vẻ đẹp '
                    + 'thiên nhiên mà còn có bề dày giá trị văn hóa và tôn giáo.',
                    'https://danangfantasticity.com/wp-content/uploads/2015/10/nguhanhson.jpg',
                    'Hình ảnh Ngũ Hành Sơn'),
                new PostContent(
                    '2. Môi trường sống thân thiện và sôi động',
                    'Không chỉ được thiên nhiên ưu đãi cho nhiều cảnh quang đẹp, Đà Nẵng còn là một thành phố đáng sống '
                    + 'bởi sự trong lành và yên bình nơi đây. Từng liên tục giữ thứ hạng cao nhất nước về tốc độ phát triển '
                    + 'kinh tế nhưng Đà Nẵng vẫn duy trì tốt an ninh trật tự, không có người lang thang xin ăn, không có '
                    + 'người nghiện ma túy trong cộng đồng và rất hiếm khi xảy ra tình trạng kẹt xe.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'Đó là lí do mà du khách hoàn toàn thoải mái và yên tâm khi đi dạo khắp thành phố. Đến với Đà Nẵng, '
                    + 'du khách sẽ được thưởng thức nhiều món ăn đặc sản như mì Quảng, bánh tráng thịt heo, hải sản '
                    + 'tươi sống ở hơn 150 nhà hàng cao cấp và đạt chuẩn.',
                    'https://danangfantasticity.com/wp-content/uploads/2017/06/trung-tam-thuong-mai-indochina-riverside-768x576.jpeg',
                    ''),
                new PostContent(
                    '',
                    'Hiện nay, thành phố Đà Nẵng đang đưa các hoạt động giải trí vào du lịch: trải nghiệm cảm giác đêm '
                    + 'Đà Nẵng trên phố du lịch Bạch Đằng, thưởng thức các chương trình biểu diễn nghệ thuật truyền thống, '
                    + 'tham gia các hoạt động vui chơi giải trí sau 24h.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'Đà Nẵng hiện có sân golf 18 lỗ đã đạt nhiều giải thưởng quốc tế sẵn sàng đáp ứng sở thích của những yêu golf.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'Với mục tiêu trở thành thành phố sự kiện, Đà Nẵng đã xây dựng các sự kiện du lịch lớn, trong đó '
                    + 'Cuộc thi Trình diễn Pháo hoa Quốc tế – nơi phô diễn những màn pháo hoa tuyệt đẹp đến từ các nước '
                    + 'đã trở thành sản phẩm đặc trưng của Đà Nẵng. Vào tháng 5/2011, Đà Nẵng lần đầu triển khai Cuộc thi '
                    + 'dù bay Quốc tế. Tiếp đến tháng 6 là sự kiện “Điểm hẹn mùa hè” thường niên, quy tụ những hoạt động '
                    + 'giải trí biển, thỏa mãn kỳ nghỉ hè của du khách.',
                    'https://danangfantasticity.com/wp-content/uploads/2017/06/dem-thuy-xung-dang-la-dem-phao-hoa-tuong-nhat2.jpg',
                    ''),
                new PostContent(
                    '3. Dễ tiếp cận',
                    'Rất thuận lợi cho du khách đến với Đà Nẵng. Đà Nẵng có sân bay quốc tế với công suất 6 triệu '
                    + 'khách/năm và hiện có nhiều đường bay trực tiếp quốc tế. Cảng nước sâu Tiên Sa là nơi thường xuyên '
                    + 'tiếp nhận du thuyền cao cấp, đưa du khách đến với Đà Nẵng. Đà Nẵng còn là trạm dừng chính của các '
                    + 'tuyến xe lửa và xe khách.',
                    'http://farm5.staticflickr.com/4228/35149235815_7765a954e5_o.jpg',
                    'Sân bay quốc tế Đà Nẵng'),
                new PostContent(
                    '4. Thành tựu và định hướng',
                    'Trong 6 tháng đầu năm 2017, tổng lượt khách tham quan, du lịch đến Đà Nẵng ước đạt 3.229.476 lượt, '
                    + 'tăng 33,2% so với cùng kỳ 2016, đạt 51,3% kế hoạch năm 2017; trong đó khách quốc tế ước đạt '
                    + '1.222.398 lượt, tăng 72% so với cùng kỳ 2016, khách nội địa ước đạt 2.007.079 lượt, tăng 17,1% '
                    + 'so với cùng kỳ 2016. Tổng thu du lịch ước đạt 2.007.079 lượt, tăng 17,1% so với cùng kỳ năm 2016, '
                    + 'đạt 51,3% kế hoạch năm 2017.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'Trong 6 tháng đầu năm 2017, lượng khách đường bộ Thái Lan, Lào đến Đà Nẵng ước đạt 4.470 lượt khách; '
                    + 'khách du lịch đường hàng không đến Đà Nẵng ước đạt 726.360 lượt khách, tăng gấp 2,2 lần so với '
                    + 'cùng kỳ năm 2016 (năm 2016 đạt 325.140 lượt); đón 44 chuyến tàu du lịch cập cảng Tiên Sa, '
                    + 'tổng lượt khách ước đạt 52.203 lượt khách, tăng 24% so với cùng kỳ năm 2016.',
                    'https://danangfantasticity.com/wp-content/uploads/2015/10/taubien.jpg',
                    'Tàu EUROPA 2')
            ], // postContents: Array<PostContent>
            'Tổng quan Đà Nẵng', // title: string
            'https://danangfantasticity.com/wp-content/uploads/2015/10/bien-danang.jpg?x13634', // cover: string
            '(Tổng hợp)', // authorId: string
            null, // location: Location
            [
                new Category('Du lịch', 'link', ['']),
                new Category('Văn hóa', 'link', ['']),
            ], // categories: Array<Category>: name, link, tags
            5, // rating: number from 0 to 5
            'ACCEPTED', // status: string
            [
                new Comment(
                    null, new Date(),
                    'Nội dung comment 1, bài viết dở tệ, hình ảnh không đẹp. Đánh giá 1 sao',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Comment số 2, bài viết bổ ích, tks',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Thấy ít comment quá nên t gõ bậy góp vui',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Tuyệt vời!\n' + 'Địa điểm quá tuyệt vời để đi du lịch, thưởng ngoạn những cảnh đẹp và dịch vụ cùng gia đình!',
                    0, [], 'SHOW'
                )
            ], // comments: Array<Comment>: userId, time, content, numberLiked, userLiked, status
            'Bài viết này không cần mô tả, người xem thích thì vào tự đọc lấy.' // description: string
        ),
        new Post(
            null,
            new Date('2018-11-16'), // createdTime: Date
            new Date('2018-11-16'), // approvedTime: Date
            ['Món ngon', 'Đặc sản', 'Biển', 'Nha Trang', 'VinPeal'], // tags: Array<string>
            [
                new PostContent(
                    'Giới thiệu du lịch Nha Trang',
                    'Thành phố biển Nha Trang là thủ phủ của tỉnh Khánh Hòa, thuộc miền duyên hải Nam Trung bộ Việt Nam. '
                    + 'Vịnh biển Nha Trang là một trong những vịnh biển đẹp nhất thế giới, đó là món quà vô giá '
                    + 'mà thiên nhiên ban tặng cho vùng đất này.',
                    'http://media.dulich24.com.vn/ec2aedc2-3b26-426e-b90b-e777aa74c02d-1.png',
                    'Quảng trường trung tâm tp Nha Trang. (ảnh: zing.vn)'),
                new PostContent(
                    '',
                    'Tuyến đường Trần Phú chạy dọc theo bờ biển, là con đường lớn nhất, đẹp nhất, cũng là nơi '
                    + 'sầm uất nhất của thành phố Nha Trang, trên tuyến đường này có rất nhiều khách sạn, quán ăn ... '
                    + 'bên kia đường là bãi tắm tuyệt đẹp của Tp Nha Trang.',
                    'http://media.dulich24.com.vn/fb801d6c-cf3f-49ab-9104-4ed50ebcd131-1.jpg',
                    'Trục đường Trần Phú đẹp nhất Nha Trang.'),
                new PostContent(
                    'Đặt Khách Sạn Nha Trang',
                    'Khách sạn ở Nha Trang hầu hết đều nằm gần biển để đáp ứng nhu cầu nghỉ dưỡng, tắm biển của '
                    + 'du khách. Đi du lịch Nha Trang bạn nên chọn khách sạn theo tiêu chí khu vực sẽ nghỉ, sau đó '
                    + 'đến hạng sao và giá tiền. Dưới đây là những khu vực bạn nên đặt khách sạn.',
                    'http://media.dulich24.com.vn/bai-viet/kinh-nghiem-dat-khach-san-gia-tot-o-nha-trang-45031939/'
                    + 'kinh-nghiem-dat-khach-san-tot-o-nha-trang-1.jpg',
                    'Khách sạn khu vực trung tâm có tầm nhìn xuống bãi biển rất đẹp.'),
                new PostContent(
                    '',
                    'Khu vực trung tâm thành phố Nha Trang có rất nhiều nhà nghỉ, khách sạn, resort. Đây là khu vực '
                    + 'sầm uất, náo nhiệt nhất Nha Trang, xung quanh có rất nhiều điểm du lịch đẹp của Nha Trang, '
                    + 'nổi tiếng nhất là bãi biển trung tâm Nha Trang rất đẹp.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'Phần lớn khách du lịch Nha Trang đều đặt phòng khách sạn ở khu vực trung tâm này vì dịch vụ '
                    + 'rất phát triển, có nhiều nhà hàng, quán ăn ngon, nghỉ ở đây rất thuận tiện cho tắm biển '
                    + 'và đi tham quan các điểm du lịch nổi tiếng của Nha Trang.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'content',
                    'Giá phòng ở khu vực trung tâm khá cao, khách sạn tập trung trên tuyến đường Trần Phú, '
                    + 'Hùng Vương, Nguyễn Thiện Thuật, Biệt Thự ... khách sạn khu vực này có view rất đẹp nhìn thẳng xuống biển, '
                    + 'để tắm biển bạn chỉ cần đi bộ vài phút từ chỗ nghỉ là ra tới bãi biển.',
                    ''),
                new PostContent(
                    '',
                    '',
                    'http://media.dulich24.com.vn/bai-viet/kinh-nghiem-dat-khach-san-gia-tot-o-nha-trang-45031939/'
                    + 'kinh-nghiem-dat-khach-san-tot-o-nha-trang-2.jpg',
                    'Resort khu vực bãi dài đều có bãi biển riêng và không gian tươi mát cho kỳ nghỉ hoàn hảo.'),
                new PostContent(
                    '',
                    'Bãi Dài thuộc thành phố Cam Ranh, Bãi Dài là bãi biển đẹp nhất ở Khánh Hòa, '
                    + 'có nước trong xanh, bãi biển thoai thoải, cát mịn.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'Khu vực Bãi Dài chủ yếu là Resort cao cấp từ 4 sao trở lên, nằm dọc theo bờ Biển Bãi Dài, '
                    + 'những khu Resort ở đây đều có bãi biển riêng và có khuôn viên rất rộng.',
                    '',
                    ''),
                new PostContent(
                    '',
                    'Ở Khu vực Bãi Dài cũng có khách sạn và nhà nghỉ ở xa bãi biển hơn, nhưng cũng rất thuận tiện để đi ra tới bãi biển.',
                    '',
                    ''),
                new PostContent(
                    '',
                    '',
                    'http://media.dulich24.com.vn/4d87724f-5bb4-439f-92b1-bc6374f2dc50-5.jpg',
                    'Khách Sạn, Resort trên Những Hòn Đảo Trong Vịnh Nha Trang.'),
                new PostContent(
                    'Những Bãi Tắm Đẹp Nhất Nha Trang',
                    '',
                    'http://media.dulich24.com.vn/cf31dd96-bca0-45c1-b98d-98d50ce88b14-3.jpg',
                    'Bãi tắm trung tâm thành phố Nha Trang.'),
                new PostContent(
                    '',
                    '',
                    'http://media.dulich24.com.vn/c4a6e91f-86d7-4b82-bf57-f00278c8b5fb-39.jpg',
                    'Bãi Dương và bãi Hòn Chồng.'),
                new PostContent(
                    '',
                    '',
                    'http://media.dulich24.com.vn/bai-viet/top-nhung-bai-tam-dep-nhat-nha-trang-36031653/'
                    + 'top-nhung-bai-tam-dep-nhat-nha-trang-5.jpg',
                    'Bãi Dốc Lết.'),
                new PostContent(
                    '',
                    '',
                    'http://media.dulich24.com.vn/bai-viet/top-nhung-bai-tam-dep-nhat-nha-trang-36031653/'
                    + 'top-nhung-bai-tam-dep-nhat-nha-trang-6.jpg',
                    'Bãi Dài.')
            ], // postContents: Array<PostContent>
            'Du Lịch Nha Trang', // title: string
            'http://streaming1.danviet.vn/upload/2-2018/images/2018-04-11/13-1523420138-width650height365.jpg', // cover: string
            'Nguồn dulich24.com.vn', // authorId: string
            null, // location: Location
            [
                new Category('Du lịch', 'link', [''])
            ], // categories: Array<Category>: name, link, tags
            5, // rating: number from 0 to 5
            'PENDING', // status: string
            [
                new Comment(
                    null, new Date(),
                    'Nội dung comment 1, bài viết dở tệ, hình ảnh không đẹp. Đánh giá 1 sao',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Comment số 2, bài viết bổ ích, tks',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Thấy ít comment quá nên t gõ bậy góp vui',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    '....',
                    0, [], 'SHOW'
                )
            ], // comments: Array<Comment>: userId, time, content, numberLiked, userLiked, status
            'Bài viết này không cần mô tả, người xem thích thì vào tự đọc lấy.' // description: string
        ),
        new Post(
            null,
            new Date('2018-11-16'), // createdTime: Date
            new Date('2018-11-16'), // approvedTime: Date
            [
                'Mộc Châu', 'Bản Tả Phìn', 'Làng Tà Chải', 'Ruộng bậc thang Mù Cang Chải',
                'Hà Giang', 'Sapa', 'Hoàng Su Phì', 'Mù Cang Chải'
            ], // tags: Array<string>
            [
                new PostContent(
                    'Mộc Châu, Sơn La',
                    ' Tiết trời thu tháng 9, tháng 10 là điều kiện thời tiết lý tưởng để tới thăm Mộc Châu. '
                    + 'Mùa lúa chín, bạn sẽ được mãn nhãn với những ruộng bậc thang nhuộm trong sắc vàng, '
                    + 'rải rác là những mái nhà, làng bản. Bạn cũng có cơ hội tới thăm đồi chè và chìm trong sắc dã quỳ vàng, '
                    + 'cải trắng nếu những loài hoa này đã nở.',
                    'http://media.dulich24.com.vn/bai-viet/nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-62113721/'
                    + 'nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-1.jpg',
                    'Mộc Châu mùa lúa chín'),
                new PostContent(
                    'Mù Cang Chải',
                    ' Là một trong những cung nổi tiếng với các thửa ruộng bậc thang vàng óng, '
                    + 'Mù Cang Chải có La Pán Tẩn trĩu bông, thung lũng Cao Phạ vàng rực, đẹp mê hồn ẩn hiện giữa màn sương.',
                    'http://media.dulich24.com.vn/bai-viet/nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-62113721/'
                    + 'nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-2.jpg',
                    ''),
                new PostContent(
                    'Hà Giang',
                    ' Là nơi gieo lúa vụ đông muộn nhất miền Bắc, đây là điểm thăm quan ngắm lúa vàng cho những ai '
                    + 'chưa lên kế hoạch phượt sớm được. Cung đường Hà Giang khá hiểm trở nhưng cảnh những '
                    + 'ruộng bậc thang rộ vàng là phần thưởng xứng đáng cho các phượt thủ. Đặc biệt, ruộng bậc thang '
                    + 'Hoàng Su Phì vừa qua đã được công nhận là di sản quốc gia.',
                    'http://media.dulich24.com.vn/bai-viet/nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-62113721/'
                    + 'nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-3.jpg',
                    'Cảnh những ruộng bậc thang rộ vàng'),
                new PostContent(
                    'Sapa',
                    'Tới Sapa trên một chuyến tàu rồi thuê xe máy ghé thăm các bản Tả Phìn, Lao Chải…, '
                    + 'du khách vừa được chiêm ngưỡng những bậc thang lúa vàng tuyệt đẹp trong nắng vàng, '
                    + 'vừa được khám phá văn hóa truyền thống độc đáo của đồng bào dân tộc thiểu số.',
                    'http://media.dulich24.com.vn/bai-viet/nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-62113721/'
                    + 'nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-4.jpg',
                    'Bậc thang lúa vàng tuyệt đẹp trong nắng vàng'),
                new PostContent(
                    'Tú Lệ, Yên Bái, Lào Cai',
                    'Cung đường qua những cái tên quen thuộc với giới phượt như Tú Lệ, Khau Phạ, La Pán Tẩn… '
                    + 'luôn là lựa chọn hàng đầu cho các phượt thủ mê lúa mùa thu. Đúng như cái tên của nó, '
                    + 'cung phượt Tú Lệ cho bạn hiểu thêm về vẻ đẹp tú lệ của miền Tây Bắc tổ quốc.',
                    'http://media.dulich24.com.vn/bai-viet/nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-62113721/'
                    + 'nhung-cung-duong-phuot-tay-bac-hap-dan-trong-mua-lua-chin-vang-5.jpg',
                    'Vẻ đẹp tú lệ của miền Tây Bắc')
            ], // postContents: Array<PostContent>
            'Cung đường phượt Tây Bắc hấp dẫn trong mùa lúa chín vàng', // title: string
            'http://streaming1.danviet.vn/upload/2-2018/images/2018-04-11/13-1523420138-width650height365.jpg', // cover: string
            'Nguồn dulich24.com.vn', // authorId: string
            null, // location: Location
            [
                new Category('Du lịch', 'link', [''])
            ], // categories: Array<Category>: name, link, tags
            5, // rating: number from 0 to 5
            'ACCEPTED', // status: string
            [
                new Comment(
                    null, new Date(),
                    'Nội dung comment 1, bài viết dở tệ, hình ảnh không đẹp. Đánh giá 1 sao',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Comment số 2, bài viết bổ ích, tks',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    'Thấy ít comment quá nên t gõ bậy góp vui',
                    0, [], 'SHOW'
                ),
                new Comment(
                    null, new Date(),
                    '....',
                    0, [], 'SHOW'
                )
            ], // comments: Array<Comment>: userId, time, content, numberLiked, userLiked, status
            'Cứ đến độ tháng 9, tháng 10 hàng năm, lúa lại chín vàng, nhuộm khắp miền núi Tây Bắc '
            + 'trong sắc màu tươi sáng, đậm chất thu sang. Đây là thời điểm các đoàn du lịch bụi háo hức '
            + 'lên kế hoạch để khám phá các cảnh sắc tuyệt đẹp của đất nước.' // description: string
        )
    ];

    // get all posts from database
    getAllPosts() {
        this.http.get<{ message: string; posts: Post[] }>(this.HOST + 'db/posts')
            .subscribe((postData) => {
                this.posts = postData.posts;
            });
    }

    // send a post and store in database
    addOnePost() {
        // const post: Post = this.posts[3];
        // console.log(post);
        // this.http.post<{ message: string }>(this.HOST + 'db/posts', post)
        //     .subscribe((resData) => {
        //         console.log(resData.message);
        //     });
    }
}
