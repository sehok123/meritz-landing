const headerComponent = `
      <link rel="stylesheet" href="/main/css/header.css" />
      <style>
        body {
          text-align: center;
          padding-top: 100px;
        }
        .fixed-btn {
          z-index: 9;
        }
        @media screen and (max-width: 760px) {
          body {
            padding-top: 60px;
          }
        }
      </style>
      <div class="mainHeader active">
        <div class="headerInner">
          <h1 class="logo">
            <a href="/" class="menu-logo">
              <img
                src="/main/images/img_logo_fixed.png"
                alt="메리츠 파트너스 로고"
              />
            </a>
          </h1>
          <ul class="menus">
            <li class="main">
              <a target="_blank" href="/" class="menu-main">파트너스란?</a>
            </li>
            <li class="has-submenu">
              <a target="_blank" href="https://meritzpartners.com/blog" class="menu-blog"
                >파트너스 가이드</a
              >
              <ul class="sub-menu">
                <li><a href="/blog/category/factcheck/" class="main-factcheck">파트너스 알아보기</a></li>
                <li><a href="/blog/category/guide/" class="main-guide">시험 준비하기</a></li>
                <li><a href="/blog/category/interview/" class="main-interview">후기 살펴보기</a></li>
              </ul>
            </li>
            <li class="has-submenu">
              <a class="main-info" href="/worrydoll/info/">걱정인형 이야기</a>
               <ul class="sub-menu">
                <li><a href="/worrydoll/info/" class="main-info">걱정인형 소개</a></li>
                <li><a href="/worrydoll/video/" class="main-video">걱정인형 필름</a></li>
                <li><a href="/worrydoll/event/" class="main-event">이벤트</a></li>
              </ul>
            </li>
            <li>
              <a target="_blank" href="/faq/" class="menu-faq">자주 묻는 질문</a>
            </li>
          </ul>
          <button class="menuBtn active"></button>
          <div class="mobileMenu">
            <div class="top">
              <strong>
                <a target="_blank" href="/" class="menu-logo">
                  <img src="/main/images/img_logo_fixed.png" alt="" />
                </a>
              </strong>
              <button class="closeBtn"></button>
            </div>
            <ul>
              <li class="main">
                <a target="_blank" href="/" class="menu-main">파트너스란?</a>
              </li>
              <li>
                <a target="_blank" href="https://meritzpartners.com/blog"
                  class="menu-blog" >파트너스 가이드 </a
                >
                  <ul class="sub-menu">
                    <li><a href="/blog/category/factcheck/" class="menu-main-factcheck">파트너스 알아보기</a></li>
                    <li><a href="/blog/category/guide/" class="menu-main-guide">시험 준비하기</a></li>
                    <li><a href="/blog/category/interview/" class="menu-main-interview">후기 살펴보기</a></li>
                  </ul>
              </li>
              <li>
                <a href="/worrydoll/info/" class="menu-story">걱정인형 이야기</a>
                <ul class="sub-menu">
                  <li><a href="/worrydoll/info/" class="main-info">걱정인형 소개</a></li>
                  <li><a href="/worrydoll/video/" class="main-video">걱정인형 필름</a></li>
                  <li><a href="/worrydoll/event/" class="main-event">이벤트</a></li>
                </ul>
              </li>
              <li>
                <a target="_blank" href="/faq/" class="menu-faq">자주 묻는 질문</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
`;

document.addEventListener("DOMContentLoaded", function () {
  const headerEventHendler = () => {
    const body = document.querySelector("body");

    const menuBtn = document.querySelector(".menuBtn");
    const closeBtn = document.querySelector(".closeBtn");
    const mobileMenu = document.querySelector(".mobileMenu");

    // 열기
    menuBtn.addEventListener("click", () => {
      body.style.overflow = "hidden";
      mobileMenu.classList.add("active");
    });

    // 닫기
    closeBtn.addEventListener("click", () => {
      body.style.overflow = "auto";
      mobileMenu.classList.remove("active");
    });
  };
  const header = document.querySelector("#header-container");
  const { pathname } = window.location;
  const headerPaths = [
    "/",
    "/faq",
    "/faq/",
    "/worrydoll/info",
    "/worrydoll/info/",
    "/worrydoll/video",
    "/worrydoll/video/",
    "/worrydoll/event",
    "/worrydoll/event/",
  ];
  const shouldLoadHeader =
    headerPaths.includes(pathname) ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/");
  // 경로가 /, /blog~, /faq/, /worrydoll/* 일때만 적용하기
  if (header && shouldLoadHeader) {
    header.innerHTML = headerComponent;
    headerEventHendler();

    setLogoHref();
    setMainHref();
  }
});

window.addEventListener("click", function (e) {
  const aTag = e.target.closest("a");
  if (!aTag) return;
  // menu-로 시작하는 클래스가 있는지 확인
  const hasMenuClass = Array.from(aTag.classList).some(
    (cls) =>
      cls.startsWith("menu-") ||
      cls.startsWith("main-") ||
      cls.startsWith("logo-main"),
  );
  if (!hasMenuClass) return;

  // 기본 새탭 방지
  e.preventDefault();

  const currentUrl = new URL(window.location.href);
  const params = window.location.search;
  const advtVal = currentUrl.searchParams.get("advtMdiaDivVal");

  // 이동할 링크 기본값
  const linkUrl = new URL(aTag.href, window.location.origin);

  if (linkUrl.pathname === "/blog") {
    linkUrl.pathname = "/blog/";
  }

  // advtMdiaDivVal이 event, story, main이면 파라미터 없이 바로 이동
  if (["event", "story", "main", "site", "main"].includes(advtVal)) {
    window.location.href = linkUrl.toString();
    return;
  }

  // // advtMdia 관련 3개 파라미터만 복사해서 이동
  // ["advtMdiaDivVal", "advtMdiaTpDivVal", "advtMdiaDtlDivVal"].forEach((key) => {
  //   const val = currentUrl.searchParams.get(key);
  //   if (val) linkUrl.searchParams.set(key, val);
  // });

  // 현재 탭에서 이동
  console.log(linkUrl.pathname, "linkUrl");
  window.location.href = linkUrl + params;
});

function setMainHref() {
  const links = document.querySelectorAll(".main a");
  console.log(links, "links");
  if (!links) return;

  const targetName = sessionStorage.getItem("template");
  const params = window.location.search;
  const hostname = window.location.hostname;
  const isDev = hostname.includes("dev.");
  links.forEach((link) => {
    link.href = `https://${isDev ? "dev." : ""}meritzpartners.com/${targetName ? `${targetName}/` : ""}`;
  });
}

function setLogoHref() {
  const logoLink = document.querySelector(".menu-logo");
  if (!logoLink) return;

  const params = window.location.search;
  const hostname = window.location.hostname;
  const isDev = hostname.includes("dev.");

  const targetName = sessionStorage.getItem("template");

  //  session 없으면 기본 /
  console.log(params, "params");
  if (!targetName) {
    logoLink.href = "/" + params;
    return;
  }

  // session 있으면 A/B 경로
  logoLink.href = `https://${isDev ? "dev." : ""}meritzpartners.com/${targetName}/${params}`;
}

document.addEventListener("DOMContentLoaded", function () {
  // TradingWorks Script Load
  if (!window.IGATracking) {
    !(function (n, a) {
      if (void 0 !== n && !n.IGATracking) {
        var i = { queue: [] };
        var c = a.createElement("script");

        c.type = "text/javascript";
        c.async = true;
        c.src =
          "//tradingworks-scripts.s3.ap-northeast-1.amazonaws.com/js/web-landing-script-async-min.js";

        c.onload = function () {
          if (n.IGATrackingRunQueuedFunctions) {
            n.IGATrackingRunQueuedFunctions();
          }

          console.log("TradingWorks Loaded");
          console.log(window.IGATrackingConversion);
        };

        [
          "IGATrackingPush",
          "IGATrackingPushDomain",
          "IGATrackingConversion",
          "IGATrackingPurchase",
          "IGATrackingEvent",
          "IGATrackingCustomEvent",
        ].forEach(function (a) {
          n[a] = function () {
            i.queue.push([a, arguments]);
          };
        });

        var e = a.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(c, e);

        n.IGATrackingPushDomain();
        n.IGATracking = i;
      }
    })(window, document);
  }

  // 기존 코드
});
