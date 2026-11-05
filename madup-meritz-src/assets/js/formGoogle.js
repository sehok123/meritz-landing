const formHtml = `
  <style>
    .privacy-box {
      padding-top: 10px;
    }
    .privacy-box
      div[class^="checkbox-"]
      input[type="checkbox"]
      + label.allCheck {
      font-size: 18px;
    }
    .privacy-box div[class^="checkbox-"] input[type="checkbox"] + label:before {
      width: 14px;
      background: url(/assets/images/icon_privacyCheck.png) no-repeat center /
        100% auto;
    }
    .privacy-box
      [class^="checkbox-"]
      input[type="checkbox"]:checked
      + label:before {
      background-image: url(/assets/images/icon_privacyCheck_on.png);
    }
    .privacy-box .checkbox-agree {
      margin-top: 0 !important;
    }
    .bottom-sheet .inquiryForm {
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
    }
    .checkbox-survey  .checkInfoText {
      width: 100%;
      text-align: left;
      font-size: 15px;
      margin-top: 4px;
      padding-left: 20px;
      color:#ee3823;
    }
    .checkbox-privacy,
    .checkbox-survey {
      display: flex;
      flex-direction: column;
    }
    .checkbox-privacy .checkBox,
    .checkbox-survey .checkBox {
      display: flex;
      width: 100%;
    }
    .checkbox-privacy .sheet-wrap,
    .checkbox-survey .sheet-wrap {
      width: 100%;
      padding: 10px;
      text-align: left;
      margin-top: 10px;
      height: 100px;
      overflow: auto;
      border: 1px solid #eee;
      border-radius: 10px;
      margin-top: 10px;
      font-size: 12px;
    }
    .checkbox-privacy .sheet-header,
    .checkbox-survey .sheet-header {
      display: flex;
      flex-direction: column;
      text-align: left;
      width: 100%;
      position: static;
    }
    .checkbox-privacy .sheet-header h3,
    .checkbox-survey .sheet-header h3 {
      width: 100%;
      padding-right: 0;
      text-align: left;
      font-size: 16px;
    }
    .checkbox-privacy .sheet-header .desc,
    .checkbox-survey .sheet-header .desc {
      font-size: 14px !important;
    }
    .checkbox-privacy .sheet-contents,
    .checkbox-survey .sheet-contents {
      text-align: left;
    }
    .sheet-agree .terms-desc .agreement {
      flex-direction: column;
      margin: 14px 0 0 0;
    }
    #inquiry {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    #inquiry .area_button {
      position: sticky;
      width: 100%;
      bottom: 0;
      background: #fff;
      z-index: 5;
      padding: 20px 0;
      margin-top: auto;
    }
    #inquiry .area_button .submit_desc {
      margin-top: 0;
    }
    .sheet-success #ageText {
      margin: 22px 0 4px 0;
      font-size: 10px;
      white-space: pre-wrap;
    }
    @media screen and (max-width: 760px) {
      .sheet-success #ageText {
        margin-top: 14px;
        font-size: 8px;
      }
    }
  </style>
  <div class="sheet-wrap application sheet-agree">
    <div class="sheet-header">
      <h3>파트너스 무료 상담 신청하기</h3>
      <button
        onclick="closeBottomSheet('sheet-counsel'); init_value();"
        class="close-button btn-click"
        data-title="상담신청 닫기"
      >
        <span class="screen-only">닫기</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24"
          height="24"
          fill="none"
        >
          <path
            fill="#222"
            d="M21.172 24 5.586 8.414l2.828-2.828L24 21.17 39.586 5.586l2.828 2.828L26.83 24l15.585 15.586-2.828 2.828L24 26.828 8.414 42.414l-2.828-2.828L21.172 24Z"
          />
        </svg>
      </button>
    </div>
    <div class="sheet-contents inquiryForm">
      <div class="content-title">
        <p class="desc">빠른 상담을 위해</p>
        <h4>최소한의 정보만 받고 있어요</h4>
      </div>
      <div id="inquiry">
        <div class="area_form">
          <form name="Frm" id="Frm" method="post">
            <!-- <input type="hidden" name="code_value" value="{{code_value}}"> -->
            <div class="form_box">
              <div class="input_item">
                <p>이름<span class="blind">필수 선택</span></p>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="예&#41; 홍길동"
                  autocomplete="off"
                />
              </div>
              <div class="input_item">
                <p>휴대전화<span class="blind">필수 선택</span></p>
                <div class="phone-wrap">
                  <input
                    type="tel"
                    class="onlynumber"
                    id="user_call"
                    name="user_call"
                    placeholder="-를 제외한 번호만 입력해주세요 (타인 번호 도용 시 법적 책임이 따를 수 있습니다)"
                    maxlength="11"
                    autocomplete="off"
                    v-model="ctp"
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                  />
                </div>
              </div>

              <div class="input_item">
                <p>지역<span class="blind">필수 선택</span></p>
                <ul class="select_box group">
                  <li class="select_item">
                    <label></label>
                    <select name="user_sido" id="user_sido" required>
                      <option value="" disabled selected>시/도</option>
                      <option value="서울특별시">서울특별시</option>
                      <option value="대구광역시">대구광역시</option>
                    </select>
                  </li>
                  <li class="select_item">
                    <label></label>
                    <select name="user_gugun" id="user_gugun" required>
                      <option value="" disabled selected>시/군/구</option>
                      <option value="강남구">강남구</option>
                    </select>
                  </li>
                </ul>
              </div>

              <div class="input_item" id="consultationTime">
                <p>상담가능시간<span class="blind">필수 선택</span></p>
                <div class="select_box">
                  <label></label>
                  <select name="" id="cns_req_hr_div_cd" required>
                    <option value="" disabled selected>
                      시간을 선택해주세요
                    </option>
                    <option value="13">[오전]이 좋아요</option>
                    <option value="14">[오후]가 좋아요</option>
                    <!-- <option value="16">시간은 상관없어요</option> -->
                  </select>
                </div>
              </div>

              <div class="input_item">
                <p>연령대<span class="blind">필수 선택</span></p>
                <div class="select_box">
                  <label></label>
                  <select name="" id="payment" required onchange="ageCheck()">
                    <option value="" disabled selected>
                      25세 이상부터 신청 가능합니다
                    </option>
                    <option value="01">10대</option>
                    <option value="02">20대</option>
                    <option value="03">30대</option>
                    <option value="04">40대</option>
                    <option value="05">50대</option>
                    <option value="06">60대 이상</option>
                  </select>
                </div>
              </div>

              <div class="input_item w-100">
                <p>직업</p>
                <div class="select_box w-100">
                  <label></label>
                  <select name="" id="job_div_cd" required>
                    <option value="" disabled selected>
                      직업을 선택해주세요
                    </option>
                    <option value="01">직장인</option>
                    <option value="02">자영업</option>
                    <option value="03">개인사업자</option>
                    <option value="04">주부</option>
                    <option value="05">무직</option>
                  </select>
                </div>
              </div>

              <div
                class="input_item w-100 input_recommender_code_hide"
                style="display: none"
              >
                <p>추천인 코드</p>
                <label></label>
                <input
                  type="text"
                  name="orgCd"
                  id="orgCd"
                  placeholder="예&#41; 320000001"
                  autocomplete="off"
                  maxlength="9"
                  oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                />
              </div>
            </div>

            <div class="privacy-box">
              <div class="checkbox-agree">
                <input type="checkbox" name="" id="c_agree" class="blind" />
                <label for="c_agree" class="allCheck">
                  약관에 전체 동의합니다
                </label>
                <div class="all-check-comment">
                  ※ 전체 동의 시 선택 동의도 포함되며, 개별 선택도 가능합니다.
                </div>
              </div>
              <div class="checkbox-privacy">
                <div class="checkBox">
                  <input
                    type="checkbox"
                    name="agree_chk"
                    id="c_terms"
                    class="blind"
                    value="terms"
                  />
                  <label for="c_terms"
                    >채용상담을 위한 개인신용정보 동의서 (필수)</label
                  >
                </div>
                <div class="sheet-wrap">
                  <div class="sheet-header">
                    <p class="desc">
                      * 본 동의서는 메리츠 파트너스가 개인정보처리자로서 수집 ·
                      이용합니다.
                    </p>
                  </div>
                  <div class="sheet-contents">
                    <div class="terms-desc">
                      <div class="desc-wrap">
                        <h4>1. 수집 · 이용에 관한 사항</h4>
                        <div class="notice">
                          <p>
                            <b>수집 · 이용목적</b>
                            메리츠 파트너스 채용 상담 진행 및 관련 안내 제공<br />
                            메리츠 파트너스에 대한 채용 정보 및 지원 방법 등 안내 제공<br />
                            상담 후 추가적인 지원 안내 및 관련 서비스에 대한 안내 제공
                          </p>
                          <p>
                            <b>수집·이용 항목</b>
                            개인(신용) 정보 : 성명, 거주지, 연령대, 성별, 전화번호, 상담가능시간, 직업
                          </p>
                          <p>
                            <b>보유 및 이용기간</b>
                            본 동의서에 따라 수집된 개인정보는 수집일로부터 1년 간 보관되며,<br />
                            이후 안전하게 폐기됩니다.
                          </p>
                          <p>
                            <b>거부 권리 및 불이익</b>
                            귀하는 아래 개인(신용)정보 수집,이용에 관한 동의를
                            거부하실 수 있습니다.<br />
                            동의 거부 시 불이익은 없으나 메리츠 파트너스의
                            채용상담 서비스는 제공되지 않습니다.
                          </p>
                        </div>
                      </div>
                      <div class="agreement">
                        <p class="text-red">
                          위 개인정보를 수집/이용 하는 것에 동의합니다.
                        </p>
                        <div class="privacy-check">
                          <div class="check-agree">
                            <input
                              type="radio"
                              name="collect_info_chk"
                              id="collect_info_agree"
                              class="blind"
                              value="true"
                            />
                            <label for="collect_info_agree">동의함</label>
                          </div>
                          <div class="check-disagree">
                            <input
                              type="radio"
                              name="collect_info_chk"
                              id="collect_info_disagree"
                              class="blind"
                              value="false"
                              checked
                            />
                            <label for="collect_info_disagree"
                              >동의하지 않음</label
                            >
                          </div>
                        </div>
                      </div>
                      <!-- <div class="agreement">
                        <p class="text-red">
                          채용안내 관련 광고성(전화/문자)수신에 동의합니다.
                        </p>
                        <div class="privacy-check">
                          <div class="check-agree">
                            <input
                              type="radio"
                              name="allow_ad_chk"
                              id="allow_ad_agree"
                              class="blind"
                              value="true"
                            />
                            <label for="allow_ad_agree">동의함</label>
                          </div>
                          <div class="check-disagree">
                            <input
                              type="radio"
                              name="allow_ad_chk"
                              id="allow_ad_disagree"
                              class="blind"
                              value="false"
                              checked
                            />
                            <label for="allow_ad_disagree">동의하지 않음</label>
                          </div>
                        </div>
                      </div> -->
                      <!-- <a href="javascript:void(0);" class="confirm button dark" onclick="agreeAll()">전체 동의</a> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="checkbox-survey">
                <div class="checkBox">
                  <input
                    type="checkbox"
                    name="agree_chk"
                    id="c_survey_privacy"
                    class="blind"
                    value="survey"
                  />
                  <label for="c_survey_privacy"
                    >채용마케팅 활용을 위한 개인정보 동의 (선택)</label
                  >
                </div>
                <b class="checkInfoText">※미동의 시 상담신청은 가능하나, 리워드 및 추가 혜택 대상에서는 제외됩니다.</b>
                <div class="sheet-wrap">
                  <div class="sheet-header">
                    <p class="desc">
                      *본 동의서는 메리츠 파트너스가 개인정보처리자로서
                      수집·이용합니다.
                    </p>
                  </div>
                  <div class="sheet-contents">
                    <div class="terms-desc">
                      <div class="desc-wrap">
                        <h4>1. 수집 · 이용에 관한 사항</h4>
                        <div class="notice">
                          <p>
                            <b>수집·이용 목적</b>
                            메리츠 파트너스 채용 서비스 관련 정보 제공 및 안내<br />
                            채용 이벤트 및 프로모션 안내<br />
                            채용 시장 조사 및 서비스 품질 향상
                          </p>
                          <p>
                            <b>보유 및 이용 기간</b>
                            본 동의서에 따라 수집된 개인정보는 수집일로부터 1년 간 보관되며,<br />
                            이후 안전하게 폐기됩니다.
                          </p>
                          <p>
                            <b>수집·이용 항목</b>
                            개인(신용) 정보 : 성명, 거주지, 연령대, 성별, 전화번호, 상담가능시간, 직업
                          </p>
                          <p>
                            <b>동의 거부 권리 및 불이익</b>
                            귀하는 본 동의를 거부하실 수 있으며, 거부하신
                            경우에도 ‘메리츠 파트너스’ 서비스 이용에는 제한이
                            없습니다.<br />
                            다만, 마케팅 정보 제공 등 부가 혜택 안내가 제한될 수
                            있습니다.
                          </p>
                        </div>
                      </div>
                      <div class="agreement">
                        <p class="text-red">
                          위 개인정보를 수집/이용 하는 것에 동의합니다.
                        </p>
                        <div class="privacy-check">
                          <div class="check-agree">
                            <input
                              type="radio"
                              name="survey_privacy_chk"
                              id="s-agree"
                              class="blind"
                              value="true"
                            />
                            <label for="s-agree">동의함</label>
                          </div>
                          <div class="check-disagree">
                            <input
                              type="radio"
                              name="survey_privacy_chk"
                              id="s-disagree"
                              class="blind"
                              value="false"
                              checked
                            />
                            <label for="s-disagree">동의하지 않음</label>
                          </div>
                        </div>
                      </div>
                      <div class="agreement">
                        <p class="text-red">
                          채용 마케팅 광고성 정보(전화/문자/카카오톡/이메일)
                          수신에 동의합니다.
                        </p>
                        <div class="privacy-check">
                          <div class="check-agree">
                            <input
                              type="radio"
                              name="survey_privacy_chk2"
                              id="sns_agree"
                              class="blind"
                              value="true"
                            />
                            <label for="sns_agree">동의함</label>
                          </div>
                          <div class="check-disagree">
                            <input
                              type="radio"
                              name="survey_privacy_chk2"
                              id="sns_disagree"
                              class="blind"
                              value="false"
                              checked
                            />
                            <label for="sns_disagree">동의하지 않음</label>
                          </div>
                        </div>
                      </div>
                      <!-- <a
                                                href="javascript:void(0)"
                                                class="confirm button dark"
                                                onclick="closeBottomSheet('sheet-agreement3')"
                                                >확인</a
                                            > -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="checkbox-survey" style="display:none">
                <div class="checkBox">
                  <input
                    type="checkbox"
                    name="agree_chk"
                    id="stndHrexRciAgrYn"
                    class="blind"
                    value="stndHrexRciAgrYn"
                  />
                  <label for="stndHrexRciAgrYn"
                    >업무 시간 외 AI 안내전화를 위한 수신 동의 (선택)</label
                  >
                </div>
                <div class="sheet-wrap">
                  <div class="sheet-header">
                    <p class="desc">
                      *본 동의서는 메리츠 파트너스가 개인정보처리자로서 수집 · 이용합니다.
                    </p>
                  </div>
                  <div class="sheet-contents">
                    <div class="terms-desc">
                      <div class="desc-wrap">
                        <h4>1. 수집 · 이용에 관한 사항</h4>
                        <div class="notice">
                          <p>
                            <b>수집·이용 목적</b>
                            메리츠 파트너스 업무 외 시간 AI 상담 진행 관련 안내
                          </p>
                          <p>
                            <b>보유 및 이용 기간</b>
                            본 동의서에 따라 수집된 개인정보는 수집일로부터 1년 간 보관되며,<br/>
                            이후 안전하게 폐기됩니다.
                          </p>
                          <p>
                            <b>수집·이용 항목</b>
                            개인(신용) 정보 : 성명, 거주지, 연령대, 성별, 전화번호, 상담가능시간, 직업
                          </p>
                          <p>
                            <b>동의 거부 권리 및 불이익</b>
                              귀하는 본 동의를 거부하실 수 있으며,<br/>
                              거부하신 경우에도 ‘메리츠 파트너스’ 서비스 이용에는 제한이 없습니다.<br/>
                              다만, 미동의 시 안내전화는 영업시간(08:00~21:00)에만 발신됩니다.
                          </p>
                        </div>
                      </div>
                      <div class="agreement">
                        <p class="text-red">
                          업무 외 시간(21:00 ~익일 08:00) AI 자동 발신 안내전화 수신에 동의합니다.
                        </p>
                        <div class="privacy-check">
                          <div class="check-agree">
                            <input
                              type="radio"
                              name="stndHrexRciAg_chk"
                              id="stndHrexRciAg-agree"
                              class="blind"
                              value="true"
                            />
                            <label for="stndHrexRciAg-agree">동의함</label>
                          </div>
                          <div class="check-disagree">
                            <input
                              type="radio"
                              name="stndHrexRciAg_chk"
                              id="stndHrexRciAg-disagree"
                              class="blind"
                              value="false"
                              checked
                            />
                            <label for="stndHrexRciAg-disagree">동의하지 않음</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="area_button">
          <p class="submit_desc">
            거의 완료되었어요 !<br />
            신청 완료하면 부수입 챙길 준비 끝!
          </p>
          <button
            type="button"
            class="button btn_submit btn-click"
            data-title="상담신청 확인"
            onclick="save()"
            id="sendButton"
            disabled
          >
            신청 완료
          </button>
          <input type="hidden" id="is_saved" value="N" />
        </div>
      </div>
    </div>
  </div>
`;

const successModalHtml = `
   <style>
    .icon-success {
        width: 60px;
        height: 60px;
        margin-top: 14px;
        background: none;
        }
        .bottom-sheet.sheet-success h5 {
            font-size: 20px;
            margin-top: 10px;
        }
        .bottom-sheet.sheet-success .textBox {
        margin-top: 22px;
        }
        .text-success-info .textBox strong {
            color: #000;
            text-align: center;
            font-family: Pretendard;
            font-size: 22px;
            font-style: normal;
            font-weight: 600;
            line-height: 118.182%;
            letter-spacing: -0.2px;
        }
         .text-success-info .textBox .infoDesc {
            margin-top:10px;
            color: #f63d31;
            text-align: center;
            font-family: Pretendard;
            font-size: 22px;
            font-weight: 600;
            line-height: 118.182%;
            letter-spacing: -0.2px;
        }
        .text-success-info .textBox strong span {
            color: #f63d31;
            font-weight: 800;
        }
        .text-success-info .textBox p {
            margin-top: 14px;
            color: #000;
            text-align: center;
            font-family: Pretendard;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px; /* 100% */
            letter-spacing: -0.2px;
        }
        .text-success-info .textBox img {
        width: 640px;
        margin: 22px auto 0 auto;
        }
        .sheet-success button {
        margin-top: 22px;
        background: #000;
        border-radius: 0;
        color: #fff;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 150% */
        letter-spacing: -0.2px;
        }
        .sheet-success .checkInfoText {
        position: relative;
        text-align: center;
        color: #000;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; /* 125% */
        letter-spacing: -0.2px;
        }
        .sheet-success .checkInfoText .checkBox {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        }
        .sheet-success .checkInfoText .checkBox input {
        cursor: pointer;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        }
        .sheet-success .checkInfoText .checkBox label {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(/assets/images/check_250202.svg) no-repeat center /
            20px auto;
        }
        .sheet-success .checkInfoText .checkBox input:checked + label {
        background: url(/assets/images/checked_250202.svg) no-repeat center /
            20px auto;
        }
        @media screen and (max-width: 760px) {
            .sheet-success.open {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .sheet-success .sheet-wrap{
                width: 320px;
                height: 560px;
            }
            .icon-success {
                margin-top: 0;
            }
            .sheet-success .text {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
            }
            .icon-success {
                width: 40px;
                height: 40px;
                margin-top:0;
            }
            .bottom-sheet.sheet-success h5 {
                margin-top: 6px;
            }
            .bottom-sheet.sheet-success .textBox {
                margin-top: 10px;
            }
            .text-success-info .textBox strong {
                font-size: 16px;
                line-height:  118.182%;
            }
            .text-success-info .textBox .infoDesc {
                margin-top:4px;
                font-size: 16px;
            }
            .text-success-info .textBox p {
                margin-top: 8px;
                font-size: 12px;
                line-height: 14px; /* 100% */
            }
            .text-success-info .textBox img{
                width: 240px;
            }
        }
    </style>
    <div class="sheet-wrap">
        <div class="sheet-contents">
            <div class="text">
            <b id="desired_time" style="display: none;"></b>
            <div id="text-success-info" class="text-success-info">
                <h5>상담 신청 완료</h5>
                <i class="icon-success">
                <img src="/assets/images/icon_checkSuccess.png" alt="" />
                </i>
                <div class="textBox">
                <strong>
                    지금 <span>알림톡 </span>확인하고<br />
                    <span>부수입 활동</span>을 빠르게 시작하세요.
                </strong>
                <img src="/assets/images/img_ctaSuccess.png" alt="" />
                    <p class="checkInfoText">
                        빠르게 등록할수록 상담 절차가 더 간편해집니다. 
                    </p>
                </div>
            </div>
            </div>
            <div class="btn-wrap">
               <p id="ageText"></p>
               <a class="button" href="https://meritzpartners.com/02MBAP/" data-title="상담신청완료 확인">
                확인
            </a>
            </div>
        </div>
    </div>
`;

const successHtmlType = `
  <style>
      .bottom-sheet.open {
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .bottom-sheet .sheet-wrap {
          width: 530px;
          height: 500px;
      }

      @media screen and (max-width: 760px) {
          .bottom-sheet .sheet-header h3 {
              font-size: 16px;
          }
          .icon-success {
              width: 50px;
              height: 50px;
          }
          .bottom-sheet.sheet-success h5 {
              font-size: 18px;
              margin-top: 14px;
          }
          .bottom-sheet.sheet-success .info-box {
              padding: 14px;
              border-radius: 16px;
              margin-top: 18px;
          }
          .bottom-sheet.sheet-success .info-box p,
          .list-dot li {
              font-size: 12px;
          }
          .bottom-sheet.sheet-success button {
              padding: 12px;
              font-size: 14px;
          }
          .bottom-sheet .sheet-wrap {
              width: 300px;
              height: 420px;
          }
          .bottom-sheet.sheet-success h2 {
              font-size: 16px;
              margin-top: 24px;
          }
      }
  </style>
  <div class="sheet-wrap animate-up">
    <div class="sheet-header">
        <h3>파트너스 상담 신청하기</h3>
        <a href="https://meritzpartners.com/02MBAP/" class="close-button btn-click" data-title="상담신청완료 닫기">
            <span class="screen-only">닫기</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" fill="none">
                <path fill="#222" d="M21.172 24 5.586 8.414l2.828-2.828L24 21.17 39.586 5.586l2.828 2.828L26.83 24l15.585 15.586-2.828 2.828L24 26.828 8.414 42.414l-2.828-2.828L21.172 24Z"></path>
            </svg>
        </a>
    </div>
    <div class="sheet-contents">
        <div class="text">
            <div id="text-success-info">
                <p><i class="icon-success"></i></p>
                <h5>상담신청이 완료되었어요</h5>
                <div class="info-box">
                    <!-- <p>원하는 시간대는 평일 <b id="desired_time">13:00 - 14:00</b>시 에요</p> -->
                    <p>
                        상담시간은 "<b id="desired_time"></b>"를 선택해주셨어요.
                    </p>
                    <ul class="list-dot">
                        <li>
                            모르는 번호로 전화가 와도 놀라지
                            마세요
                        </li>
                        <li>
                            상담원 해피콜 후 멘토가
                            배정됩니다
                        </li>
                        <li>
                            카톡도 보내드려요
                            <i class="emoji">😊</i>
                        </li>
                    </ul>
                </div>
            </div>
            <img id="newyear250127" src="/assets/images/newyear_250127.jpg" alt="상담 신청이 완료되었습니다" style="max-width: 100%; display: none">
            <img id="newyear250131" src="/assets/images/newyear_250131.jpg" alt="상담 신청이 완료되었습니다" style="max-width: 100%; display: none">
        </div>
        <div class="btn-wrap">
            <p id="ageText"></p>
            <a class="button" href="https://meritzpartners.com/02MBAP/" data-title="상담신청완료 확인">
                확인
            </a>
        </div>
    </div>
</div>
`;

const MEDIA_TIME_HOLIDAYS_2026 = new Set([
  "2026-01-01",
  "2026-02-16",
  "2026-02-17",
  "2026-02-18",
  "2026-03-01",
  "2026-03-02",
  "2026-05-01",
  "2026-05-05",
  "2026-05-24",
  "2026-05-25",
  "2026-06-03",
  "2026-06-06",
  "2026-07-17",
  "2026-08-15",
  "2026-08-17",
  "2026-09-24",
  "2026-09-25",
  "2026-09-26",
  "2026-10-03",
  "2026-10-05",
  "2026-10-09",
  "2026-12-25",
]);

const getMediaDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function isValidMediaTime(mediaCode) {
  const now = new Date();

  // 2026-05-28 21:00:00 기준
  const targetDate = new Date(2026, 4, 28, 21, 0, 0);
  // month는 0부터 시작하므로 4 = 5월

  let validMedia = ["google", "meta"];

  // 5월 28일 오후 9시 이후부터 tiktok 추가
  // if (now >= targetDate) {
  //   validMedia.push("tiktok");
  // }

  return validMedia.includes(mediaCode);
}

// 페이지 로드 후 form 내용을 동적으로 삽입
document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  const advtMdiaDivVal = urlParams.get("advtMdiaDivVal");
  const advtMdiaDtlDivVal = urlParams.get("advtMdiaDtlDivVal");
  const areaForm = document.getElementById("sheet-counsel");
  const successForm = document.getElementById("sheet-success");

  if (areaForm) {
    areaForm.innerHTML = formHtml; // area_form 내부에 formHTML 삽입
  }
  if (successForm) {
    // if (isValidMediaTime(advtMdiaDivVal)) {
    //   successForm.innerHTML = `
    //     <style>
    //       .is_mo {
    //         display: none;
    //       }
    //       .imgBox {
    //         position: relative;
    //         display: flex;
    //         padding:40px 0;
    //         justify-content: center;
    //         align-items: center;
    //         width: 100%;
    //         height: 100%;
    //       }
    //       .content {
    //         position: relative;
    //         display: flex;
    //       }
    //       .content img{
    //         max-width:420px;
    //       }
    //       .result-close {
    //         position: absolute;
    //         top: 3.2%;
    //         right: 6.5%;
    //         width: 6%;
    //         height: 4%;
    //       }
    //       .result-success {
    //         position: absolute;
    //         bottom: 7%;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         width: 90%;
    //         height: 10%;
    //       }

    //         @media screen and (max-width: 760px) {
    //           .is_mo {
    //             display: block;
    //           }
    //           .is_pc {
    //             display: none;
    //           }
    //           .content img{
    //             max-width:320px;
    //           }
    //           .result-success {
    //             bottom: 9%;
    //             height: 11%;
    //           }
    //       }

    //     </style>
    //     <div class="imgBox">
    //       <div class="content">
    //         <img src="/assets/images/img_dbResult.png" alt="상담 신청이 완료되었습니다"  class="is_pc"/>
    //         <img src="/assets/images/img_dbResult_m.png" alt="상담 신청이 완료되었습니다" class="is_mo"/>
    //         <b id="desired_time" style="display: none;"></b>
    //         <button class="result-close" onclick="closeAll()"></button>
    //         <button class="result-success" onclick="closeAll()"></button>
    //       </div>
    //     </div>
    //   `;
    //   return;
    // }
    const baseParams = [
      "toss",
      "tiktok",
      "3_3",
      "meta",
      "kakao",
      "kakaobank",
      "3o3",
      "google",
    ];
    const isBaseType = baseParams.some((param) =>
      advtMdiaDivVal?.includes(param),
    );
    successForm.innerHTML = successModalHtml; // area_form 내부에 formHTML 삽입
  }
});
