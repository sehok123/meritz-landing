//파라미터 확인 로직
const getAdvtParams = () => {
  const url = new URL(window.location.href);
  return {
    advtMdiaDivVal: url.searchParams.get("advtMdiaDivVal"),
    advtMdiaTpDivVal: url.searchParams.get("advtMdiaTpDivVal"),
    advtMdiaDtlDivVal: url.searchParams.get("advtMdiaDtlDivVal"),
  };
};

// 메인 헤더 공통 핸들러
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

document.addEventListener("DOMContentLoaded", function () {
  headerEventHendler();

  const currentParams = getAdvtParams();

  const currentPageName = window.location.href
    .split("/")
    .filter((i) => i)
    .at(-1);
  const advtMdiaTpDivValName = ["evnet", "story"].includes(currentPageName)
    ? currentPageName
    : "main";
  let isParams =
    currentParams.advtMdiaDivVal &&
    currentParams.advtMdiaTpDivVal &&
    currentParams.advtMdiaDtlDivVal;

  const links = document.querySelectorAll(".post-button");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 기본 링크 이동 막기

      if (e.target.classList.contains("btn")) return;

      const targetName = sessionStorage.getItem("template");

      // 이미 파라미터가 있으면 덮어쓰지 않음
      if (isParams) {
        openBottomSheet("sheet-counsel");
        return;
      }

      let advtMdiaDivVal = "site";
      let advtMdiaTpDivVal = advtMdiaTpDivValName;
      let advtMdiaDtlDivVal = "";

      if (link.classList.contains("banner-top")) {
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-top`;
      }
      if (link.classList.contains("banner-bottom")) {
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-bottom`;
      }
      if (link.classList.contains("banner-middle"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle`;

      if (link.classList.contains("banner-card"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-card`;

      if (link.classList.contains("btn-banner-middle1"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle1`;
      if (link.classList.contains("btn-banner-middle2"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle2`;

      if (link.classList.contains("btn-banner-middle3-1"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle3-1`;

      if (link.classList.contains("btn-banner-middle3-2"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle3-2`;
      if (link.classList.contains("btn-banner-middle3-3"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle3-3`;
      if (link.classList.contains("btn-banner-middle3"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle3`;
      if (link.classList.contains("btn-banner-middle4"))
        advtMdiaDtlDivVal = `${targetName ? `${targetName}-` : ""}banner-middle4`;

      // 현재 URL에 파라미터 추가
      const url = new URL(window.location.href);
      url.searchParams.set("advtMdiaDivVal", advtMdiaDivVal);
      url.searchParams.set("advtMdiaTpDivVal", advtMdiaTpDivVal);
      url.searchParams.set("advtMdiaDtlDivVal", advtMdiaDtlDivVal);

      // 주소창에 한글 그대로 반영
      window.history.replaceState({}, "", url);

      openBottomSheet("sheet-counsel");
    });
  });
});

window.addEventListener("click", function (e) {
  const aTag = e.target.closest("a");
  if (!aTag) return;

  // menu-로 시작하는 클래스가 있는지 확인
  const hasMenuClass = Array.from(aTag.classList).some(
    (cls) => cls.startsWith("menu-") || cls.startsWith("logo-main")
  );
  if (!hasMenuClass) return;

  // 기본 새탭 방지
  e.preventDefault();

  const currentUrl = new URL(window.location.href);
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

  // advtMdia 관련 3개 파라미터만 복사해서 이동
  ["advtMdiaDivVal", "advtMdiaTpDivVal", "advtMdiaDtlDivVal"].forEach((key) => {
    const val = currentUrl.searchParams.get(key);
    if (val) linkUrl.searchParams.set(key, val);
  });

  // 현재 탭에서 이동
  console.log(linkUrl.pathname, "linkUrl");
  window.location.href = linkUrl.toString();
});
