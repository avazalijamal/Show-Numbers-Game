    if (localStorage.login) {

        window.open('../home.html', '_parent');
    }

    /*---------------------------*/


    $(document).ready(function () {

        var SRC = [
  'img/s.png',
  'img/s0.png',
  'img/s1.png',
  'img/s2.png',
  'img/s3.png',
  'img/s4.png'
];

        var PAS = [
  'img/pas1.png',
  'img/pas2.png'
];

        var i = 0;

        function sec(img, file) {

            let domImg = document.querySelector(img);
            let domFile = document.querySelector(file);

            const Oxu = new FileReader();

            Oxu.readAsDataURL(domFile.files[0]);

            Oxu.onload = function () {

                domImg.src = Oxu.result;

                SRC[0] = domImg.src;

            }

        }


        $('.img').click(function () {
            $('.file').trigger('click');

        });

        $('.file').change(function () {

            sec('.img', '.file');
        });

        $('.text').focusin(function () {
            i = 1;
            $('.img').attr('src', SRC[i]);

            $(this).keydown(function () {
                i = 2;
                $('.img').attr('src', SRC[i]);

            });

        });

        $('.pas').focusin(function () {

            i = 3;
            $('.img').attr('src', SRC[i]);


            $(this).keyup(function () {

                if ($(this).val().length > 1 && $(this).val().length < 4) {
                    i = 4;
                    $('.img').attr('src', SRC[i]);

                } else {
                    if ($(this).val().length >= 4) {
                        i = 5;
                        $('.img').attr('src', SRC[i]);

                    }
                }

            });

        });

        $('.pas').focusout(function () {
            i = 0;
            $('.img').attr('src', SRC[i]);
        });

        $('.check').click(function () {

            if ($('.pas').attr('type') == "password") {
                $('.pas').attr('type', 'text');
                $(this).attr('src', PAS[0]);
                i = 4;
                $('.img').attr('src', SRC[i]);

            } else {
                $('.pas').attr('type', 'password');
                $(this).attr('src', PAS[1]);
                i = 5;
                $('.img').attr('src', SRC[i]);

            }

        });


        $('.login').click(function () {
            i = 1;
            $('.img').attr('src', SRC[i]);


            const loginval = $('.text').val().toLowerCase();
            const pasval = $('.pas').val();
            const fullname = $('.fullname').val();
            const location = $('.location').val();
            const imgval = SRC[0]; //photonun saxlanildiqi yer


            /*----------qadaqa---------------*/
            const notpas = [">", '<'];
            let passtat = true;
            notpas.forEach(function (v) {

                if (pasval.match(v)) {
                    passtat = false;
                }
            });

            /*---------------------------------------------*/

            const notlog = [">", '<'];
            let logstat = true;
            notlog.forEach(function (v) {

                if (loginval.match(v)) {
                    logstat = false;
                }
            });
            /*----------qadaqa---------------*/
            if (loginval.trim().length >= 3) {

                if (logstat) {

                    if (pasval.trim().length >= 4) {

                        if (passtat) {

                            const data = {
                                log: loginval,
                                pas: pasval,
                                fullname: fullname,
                                location: location,
                                img: imgval
                            };

                            $.post(service.login, data, function (res) {

                                res = JSON.parse(res);

                                if (res.data == 'succes') {

                                    localStorage.setItem('login', loginval);

                                    window.open('../home.html', '_parent');

                                } else {
                                    alert(res.data);
                                }

                            });

                        } else {
                            alert(`passworda qadaqan olunmus simvol var. mes:(${notpas.join()})`);
                        }

                    } else {

                        alert("password minimum 4 simvol olmalidir");

                    }

                } else {

                    alert(`loginde qadaqan olunmus simvol var. mes:(${notlog.join()})`);
                }

            } else {

                alert("login minimum 3 simvol olmalidir");
            }

        });

    });
