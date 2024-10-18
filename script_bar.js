// script_bar.js
const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

menu.addEventListener("click",()=>{
    barraLateral.classList.toggle("max-barra-lateral");
    if(barraLateral.classList.contains("max-barra-lateral")){
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    }
    else{
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if(window.innerWidth<=320){
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span)=>{
            span.classList.add("oculto");
        })
    }
});

palanca.addEventListener("click",()=>{
    let body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("");
    circulo.classList.toggle("prendido");
});

cloud.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span)=>{
        span.classList.toggle("oculto");
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const menuIconOpen = document.querySelector('.menu ion-icon[name="menu-outline"]');
    const menuIconClose = document.querySelector('.menu ion-icon[name="close-outline"]');
    const sidebar = document.querySelector('.barra-lateral');
    const menuLinks = document.querySelectorAll('.navegacion ul li a');
    const sections = document.querySelectorAll('.content-section');

    menuIconOpen.addEventListener('click', function () {
        sidebar.classList.add('mini-barra-lateral');
        menuIconOpen.style.display = 'none';
        menuIconClose.style.display = 'block';
    });

    menuIconClose.addEventListener('click', function () {
        sidebar.classList.remove('mini-barra-lateral');
        menuIconOpen.style.display = 'block';
        menuIconClose.style.display = 'none';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.id + '-content';
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    document.getElementById('home-content').style.display = 'block';
});


