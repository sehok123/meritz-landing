const footerHtml = `   
  <link rel="stylesheet" href="/main/css/footer.css" />
  <div class="mainFooter">
      <div class="content">
        <div class="text">
          <strong>메리츠화재</strong>
          서울특별시 강남구 강남대로 382 메리츠타워<br />
          사업자등록번호 116-81-03752<br />
          대표번호 1566-7717<br />
          ©meritz partners All Rights Reserved.
          <div class="links">
            <a
              href="https://blog.naver.com/meritz_partners"
              target="_blank"
              title="네이버 바로가기"
            >
              <img src="/main/images/icon_naver.png" alt="naver Icon" />
            </a>
            <a
              href="https://youtube.com/@meritzpartners"
              target="_blank"
              title="유튜브 바로가기"
            >
              <img src="/main/images/icon_youtube.png" alt="youTube Icon" />
            </a>
            <a
              href="https://www.instagram.com/meritz.partners_official"
              target="_blank"
              title="인스타 바로가기"
            >
              <img src="/main/images/icon_instar.png" alt="instar Icon" />
            </a>
          </div>
        </div>
      </div>
    </div>`;

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("#footer-container");
  if (footer) {
    footer.innerHTML = footerHtml;
  }
});
