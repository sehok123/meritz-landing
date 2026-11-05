const noticeHtml = `
<div class="noticeCont">
    <strong class="tit">유의사항</strong>
    <table>
    <tbody>
        <tr>
        <th rowspan="3">서비스 <br class="is_mo" />안내</th>
        <td colspan="2">
            <p class="dot">
            메리츠 파트너스는 영업이나 출근 없이, 내 보험을 점검하며
            수익을 만드는 새로운 형태의 N잡 활동입니다.
            </p>
        </td>
        </tr>
        <tr>
        <td colspan="2">
            <p class="dot">
            신청 후, 온라인 교육 수료 → 간단한 시험 응시 → 의무교육 이수
            과정을 거쳐 활동을 시작하게 됩니다.
            </p>
        </td>
        </tr>
        <tr>
        <td colspan="2" class="border">
            <p class="dot">
            해당 활동은 기존 보험설계사와 달리 본업과 병행 가능한 부업
            형태로, 자유롭게 시간 활용이 가능합니다.
            </p>
        </td>
        </tr>
        <tr>
        <th rowspan="2">진행 <br class="is_mo" />안내</th>
        <td colspan="2">
            <p class="dot">
            본 페이지는 계약을 위한 절차가 아닌 상담 신청 접수용입니다.
            </p>
        </td>
        </tr>
        <tr>
        <td colspan="2" class="border">
            <p class="dot">
            신청 후의 진행은 전문 상담과 교육 절차를 통해 순차적으로
            이루어집니다.
            </p>
        </td>
        </tr>
        <tr>
        <th rowspan="7">
            활동 제한<br />
            대상 안내
        </th>
        <td colspan="2" class="bg">
            *다음에 해당하는 경우, 파트너스 활동이 제한되거나 불이익이
            발생할 수 있으니 반드시 확인 바랍니다.
        </td>
        </tr>
        <tr>
        <td rowspan="3" class="sub">
            정부 지원 <br class="is_mo" />수급자
        </td>
        <td>
            <p class="dot sm">
            기초생활수급자 / 실업급여 수급자 등은 수익이 발생할 경우
            해당 자격이 즉시 제한 또는 중단될 수 있습니다.
            </p>
        </td>
        </tr>
        <tr>
        <td>
            <p class="dot sm">
            특히 실업급여 수급자는 신청만으로도 ‘취업 간주’되어 수급이
            중단될 수 있으므로, 신중하게 판단해 주세요.
            </p>
        </td>
        </tr>
        <tr>
        <td class="border">
            <p class="dot sm">
            활동 수익은 불규칙하며 보장이 어려우므로, 정부지원 혜택
            유지가 필요한 분은 신청을 지양해 주세요.
            </p>
        </td>
        </tr>
        <tr>
        <td class="sub">육아휴직 <br class="is_mo" />중인 분</td>
        <td class="border">
            <p class="dot sm">
            파트너스 활동으로 인한 소득이 육아휴직 급여 월 상한액(약
            150만 원)을 초과할 경우, 급여 지급이 제한될 수 있습니다.
            </p>
        </td>
        </tr>
        <tr>
        <td rowspan="2" class="sub">
            법적·신용<br class="is_mo" />
            제한<br />
            대상자
        </td>
        <td>
            <p class="dot sm">
            파산 선고 후 복권되지 않은 자는 보험업법상 설계사 위촉이
            불가합니다.
            </p>
        </td>
        </tr>
        <tr>
        <td class="border">
            <p class="dot sm">
            신용불량자, 이행보증금 청구 이력자 등은 당사 내부 심사
            기준에 따라 활동이 제한될 수 있습니다.
            </p>
        </td>
        </tr>
        <tr>
        <td colspan="3" class="footer white">
            *메리츠 파트너스는 이런 분께 적합합니다
        </td>
        </tr>
        <tr>
        <td colspan="3" class="footer">
            <span class="dot"
            >내 보험을 점검하며 수익도 만들고 싶은 분</span
            >
        </td>
        </tr>
        <tr>
        <td colspan="3" class="footer">
            <span class="dot">
            퇴근 후, 아이 돌보며 짬 나는 시간에 부업을 해보고 싶은 분
            </span>
        </td>
        </tr>
        <tr>
        <td colspan="3" class="footer">
            <span class="dot">
            영업에 대한 부담 없이, 차분하게 시작해보고 싶은 분
            </span>
        </td>
        </tr>
    </tbody>
    </table>
    <p class="infoText">
    위 내용을 충분히 확인하신 후 상담을 신청해 주세요.<br />
    활동 조건에 부합하지 않는 경우, 상담 또는 실제 활동에 제한이 있을 수
    있습니다.
    </p>
</div>
`;

// 페이지 로드 후 form 내용을 동적으로 삽입
document.addEventListener("DOMContentLoaded", function () {
  const target = document.querySelector(".noticeWrapper");
  if (target) {
    target.innerHTML = noticeHtml; // area_form 내부에 formHTML 삽입
  }
});
