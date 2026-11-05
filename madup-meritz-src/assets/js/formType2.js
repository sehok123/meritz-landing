const formBoxHtml = `
                <style>
                 .sheet-form .form_box {
                  display: flex;
                  justify-content: flex-start;
                  width: 322px;
                  height: 366px;
                  padding: 34px 22px 16px 22px;
                  background-color: #fff;
                  border-radius: 20px;
                  box-shadow: 0 0 19.673px 0 rgba(210, 210, 210, 0.8);
                  z-index: 1;
                }
                .sheet-form .form_box .title {
                  display: inline-block;
                  margin-bottom: 20px;
                  color: #222;
                  font-family: Pretendard;
                  font-size: 20px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: normal;
                  letter-spacing: -0.353px;
                }
                .sheet-form .form_box .step {
                  display: none;
                  width: 100%;
                  text-align: left;
                }
                .sheet-form .form_box .step.active {
                  display: flex;
                  flex-direction: column;
                }
                .sheet-form .form_box .toggle-label {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  cursor: pointer;
                }
                .sheet-form .form_box .toggle-label::after {
                  content: "";
                  width: 6px;
                  height: 6px;
                  border-right: 2px solid #bdbdbd;
                  border-bottom: 2px solid #bdbdbd;
                  transform: rotate(45deg);
                  transition: 0.3s;
                }
                .sheet-form .form_box .checkbox-privacy.active .toggle-label::after,
                .sheet-form .form_box .checkbox-survey.active .toggle-label::after {
                  transform: rotate(-135deg);
                }
                .sheet-form .form_box .sheet-wrap {
                  display: none;
                  padding: 10px;
                }
                .sheet-form .form_box .checkbox-privacy.active .sheet-wrap,
                .sheet-form .form_box .checkbox-survey.active .sheet-wrap {
                  display: block;
                }
                .sheet-form .form_box .input_item p {
                  margin-bottom: 10px;
                  text-align: left;
                  color: #222;
                  font-family: Pretendard;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: normal;
                  letter-spacing: -0.315px;
                }
                .sheet-form .form_box .input_item input {
                  display: flex;
                  height: 50px;
                  width: 100%;
                  padding-left: 20px;
                  align-items: center;
                  color: #222;
                  font-family: Pretendard;
                  font-size: 13.771px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  letter-spacing: -0.275px;
                  background: #f4f4f4;
                  border-radius: 10px;
                }
                .sheet-form .form_box .input_item input::-moz-placeholder {
                  color: #c2c2c2;
                }
                .sheet-form .form_box .input_item input::placeholder {
                  color: #c2c2c2;
                }
                .sheet-form .form_box .input_item + .input_item {
                  margin-top: 20px;
                }
                .sheet-form .form_box .input_item .phoneInfo {
                  margin-top: 12px;
                  color: #c2c2c2;
                  font-family: Pretendard;
                  font-size: 10px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  letter-spacing: -0.215px;
                }
                .sheet-form .form_box .select_box {
                  position: relative;
                }
                .sheet-form .form_box .select_box label {
                  content: "";
                  position: absolute;
                  right: 16px;
                  top: calc(50% - 3px);
                  display: block;
                  width: 0;
                  height: 0;
                  border-left: 4px solid transparent;
                  border-right: 4px solid transparent;
                  border-top: 7px solid #d9d9d9;
                }
                .sheet-form .form_box select {
                  display: flex;
                  height: 50px;
                  width: 100%;
                  padding-left: 20px;
                  align-items: center;
                  color: #222;
                  font-family: Pretendard;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  letter-spacing: -0.275px;
                  background: #f4f4f4;
                  border-radius: 10px;
                  appearance: none;
                  -webkit-appearance: none; /* 사파리 */
                  -moz-appearance: none; /* 파이어폭스 */
                }
                .sheet-form .form_box select:invalid {
                  color: #c2c2c2;
                }
                .sheet-form .form_box .select_item {
                  position: relative;
                }
                .sheet-form .form_box .select_item + .select_item {
                  margin-top: 8px;
                }
                .sheet-form .form_box .checkbox-privacy .sheet-header .desc,
                .sheet-form .form_box .checkbox-survey .sheet-header .desc {
                  font-size: 12px !important;
                }
                .sheet-form .form_box .sheet-header .desc {
                  width: 100%;
                  font-size: 12px !important;
                  margin-top: 4px;
                  padding-bottom: 4px;
                  border-bottom: 1px solid #888;
                }
                .sheet-form .form_box .terms-desc .agreement input[type=radio] + label {
                  display: flex;
                  width: -moz-fit-content;
                  width: fit-content;
                  align-items: center;
                  color: #555;
                  font-size: 16px;
                  line-height: 26px;
                  letter-spacing: -0.05em;
                  cursor: pointer;
                  user-select: none;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                }
                .sheet-form .form_box .terms-desc .agreement input[type=radio] + label span {
                  margin-right: 6px;
                  padding: 2px 10px;
                  background: #23a6d2;
                  color: #fff;
                  font-size: 12px;
                  line-height: 1.5;
                  letter-spacing: -0.05em;
                  border-radius: 11px;
                }
                .sheet-form .form_box .terms-desc .agreement input[type=radio] + label:before {
                  content: "";
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  margin: 0 8px;
                  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="21" fill="none"><path fill="%23DDD" d="M22.192 1.2 9.584 14.728l-5.78-6.2a2.123 2.123 0 0 0-3.15 0c-.872.935-.872 2.448 0 3.382L8.008 19.8c.417.448.985.7 1.576.7.592 0 1.158-.252 1.577-.7L25.347 4.582c.87-.934.87-2.447 0-3.381a2.122 2.122 0 0 0-3.152 0h-.003Z"/></svg>') no-repeat center/auto 6px #fff;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                }
                .sheet-form .form_box .terms-desc .agreement input[type=radio]:checked + label:before {
                  content: "";
                  display: inline-block;
                  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" fill="none"><path fill="%23fff" fill-rule="evenodd" d="M3.172 6.485 4.586 7.9l5.657-5.657L8.829.829 4.586 5.07 1.758 2.242.343 3.657l2.829 2.828Z" clip-rule="evenodd"/></svg>') no-repeat center/auto 8px, #333;
                  border: 1px solid #333;
                }
                .sheet-form .form_box .terms-desc .desc-wrap .use {
                  padding: 8px;
                  background: #f1f1f1;
                  border-radius: 4px;
                }
                .sheet-form .form_box .terms-desc .desc-wrap p {
                  color: #979797;
                  font-size: 10px;
                  line-height: 18px;
                  letter-spacing: -0.05em;
                }
                .sheet-form .form_box .sheet-agree .terms-desc .agreement {
                  font-size: 12px;
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  grid-row-gap: 10px;
                  margin: 14px 0;
                }
                .sheet-form .form_box .privacy-box {
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  border: none;
                  overflow: auto;
                  margin: 0;
                  height: calc(100% - 20px);
                  flex: 1;
                  flex-wrap: nowrap;
                  padding: 0 10px 0 0;
                  margin-bottom: 20px;
                }
                .sheet-form .form_box .privacy-box .checkbox-privacy {
                  margin-top: 0;
                }
                .sheet-form .form_box .privacy-box::-webkit-scrollbar {
                  width: 4px;
                }
                .sheet-form .form_box .privacy-box::-webkit-scrollbar-thumb {
                  background: #888;
                  border-radius: 4px;
                }
                .sheet-form .form_box .privacy-box::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
                .sheet-form .form_box .privacy-box .checkBox {
                  display: flex;
                  justify-content: space-between;
                }
                .sheet-form .form_box .privacy-box .checkBox label {
                  display: flex;
                  color: #6d6a6a;
                  font-family: Pretendard;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  letter-spacing: -0.261px;
                }
                .sheet-form .form_box .privacy-box .checkBox label span {
                  margin-right: 6px;
                  color: #f13d28;
                }
                .sheet-form .form_box .privacy-box .checkBox label::before {
                  width: 9px;
                  height: 7px;
                  background-size: 100% auto;
                  margin-right: 4px;
                }
                .sheet-form .form_box .resultBox {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  height: 100%;
                  padding: 20px 0;
                }
                .sheet-form .form_box .resultBox p {
                  margin-top: 14px;
                  color: #222;
                  text-align: center;
                  font-family: Pretendard;
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: normal;
                  letter-spacing: -0.378px;
                }
                .sheet-form .form_box .resultBox button {
                  width: 100%;
                  margin-top: auto;
                  padding: 12px 0;
                  color: #fff;
                  text-align: center;
                  font-family: Pretendard;
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: normal;
                  letter-spacing: -0.358px;
                  border-radius: 8px;
                  background: #f13d28;
                }
                .sheet-form .form_box .btnBox {
                  display: flex;
                  margin-top: auto;
                  gap: 10px;
                }
                .sheet-form .form_box .btn {
                  margin-top: auto;
                  flex: 1;
                  padding: 12px 0;
                  color: #fff;
                  text-align: center;
                  font-family: Pretendard;
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: normal;
                  letter-spacing: -0.358px;
                  border-radius: 8px;
                  background: #f13d28;
                  text-align: center;
                  justify-content: center;
                }
                .sheet-form .form_box .btn::after {
                  display: none;
                }
                .sheet-form .form_box .btn.prev {
                  background-color: #f4f4f4;
                  border: none;
                  color: #565656;
                }

                @media screen and (max-width: 760px) {
                  .sheet-form .form_box {
                    width: 100%;
                  }
                }/*# sourceMappingURL=styles.css.map */
                </style>
            <div class="form_box">
              <div class="step step01 active">
                <strong class="title">결정은 상담 후에 하셔도 돼요.</strong>
                <div class="input_item">
                  <p>이름</p>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name2"
                    placeholder="예) 홍길동"
                    autocomplete="off"
                  />
                </div>
                <div class="input_item">
                  <p>휴대전화</p>
                  <div class="phone-wrap">
                    <input
                      type="tel"
                      class="onlynumber"
                      id="user_call2"
                      name="user_call"
                      placeholder="-를 제외한 번호만 입력해주세요"
                      maxlength="11"
                      autocomplete="off"
                      v-model="ctp"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                    />
                    <p class="phoneInfo">
                      *타인 번호 도용 시 법적 책임이 따를 수 있습니다
                    </p>
                  </div>
                </div>
                <button class="post-button banner-top btn next">
                  24시간 빠른 상담 신청
                </button>
              </div>
              <div class="step step02">
                <strong class="title">거주 지역을 선택해주세요</strong>
                <div class="input_item">
                  <p>지역</p>
                  <ul class="select_box group">
                    <li class="select_item">
                      <label></label>
                      <select
                        name="user_sido"
                        id="user_sido2"
                        required=""
                      ></select>
                    </li>
                    <li class="select_item">
                      <label></label>
                      <select name="user_gugun" id="user_gugun2" required="">
                        <option value="">시/군/구</option>
                      </select>
                    </li>
                  </ul>
                </div>
                <div class="btnBox">
                  <button class="prev btn">이전</button>
                  <button class="next btn">다음</button>
                </div>
              </div>
              <div class="step step03">
                <strong class="title">나이와 직업을 선택해주세요</strong>
                <div class="input_item">
                  <p>나이</p>
                  <div class="select_box">
                    <label></label>
                    <select
                      name=""
                      id="payment2"
                      required=""
                      onchange="ageCheck()"
                    >
                      <option value="" disabled="" selected="">
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
                    <select name="" id="job_div_cd2" required="">
                      <option value="" disabled="" selected="">
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
                <div class="btnBox">
                  <button class="prev btn">이전</button>
                  <button class="next btn">다음</button>
                </div>
              </div>
              <div class="step step04">
                <strong class="title">상담 가능 시간을 알려주세요</strong>
                <div class="input_item" id="consultationTime">
                  <p>상담가능시간</p>
                  <div class="select_box">
                    <label></label>
                    <select name="" id="cns_req_hr_div_cd2" required="">
                      <option value="" disabled="" selected="">
                        시간을 선택해주세요
                      </option>
                      <option value="13">[오전]이 좋아요</option>
                      <option value="14">[오후]가 좋아요</option>
                      <!-- <option value="16">시간은 상관없어요</option> -->
                    </select>
                  </div>
                </div>
                <div class="btnBox">
                  <button class="prev btn">이전</button>
                  <button class="next btn">다음</button>
                </div>
              </div>
              <div class="step step05">
                <strong class="title"
                  >상담 신청에<br />
                  꼭 필요한 동의만 추렸어요</strong
                >
                <div class="privacy-box">
                  <div class="checkbox-privacy">
                    <div class="checkBox">
                      <input
                        type="checkbox"
                        name="agree_chk"
                        id="c_terms2"
                        class="blind"
                        value="terms"
                        checked="true"
                      />
                      <label for="c_terms2"
                        ><span>필수</span>채용상담을 위한 개인신용정보 동의서
                      </label>
                      <button class="toggle-label"></button>
                    </div>
                    <div class="sheet-wrap animate-up">
                      <div class="sheet-header">
                        <p class="desc">
                          * 본 동의서는 메리츠 파트너스가 개인정보처리자로서
                          수집 · 이용합니다.
                        </p>
                      </div>
                      <div class="sheet-contents">
                        <div class="terms-desc">
                          <div class="desc-wrap">
                            <h4>1. 수집 · 이용에 관한 사항</h4>
                            <div class="notice">
                              <p>
                                <b>수집 · 이용목적</b>
                                메리츠 파트너스 채용 상담 진행 및 관련 안내
                                제공<br />
                                메리츠 파트너스에 대한 채용 정보 및 지원 방법 등
                                안내 제공<br />
                                상담 후 추가적인 지원 안내 및 관련 서비스에 대한
                                안내 제공
                              </p>
                              <p>
                                <b>수집·이용 항목</b>
                                개인(신용) 정보 : 성명, 거주지, 연령대, 성별,
                                전화번호, 상담가능시간, 직업
                              </p>
                              <p>
                                <b>보유 및 이용기간</b>
                                본 동의서에 따라 수집된 개인정보는 수집일로부터
                                1년 간 보관되며,<br />
                                이후 안전하게 폐기됩니다.
                              </p>
                              <p>
                                <b>거부 권리 및 불이익</b>
                                귀하는 아래 개인(신용)정보 수집,이용에 관한
                                동의를 거부하실 수 있습니다.<br />
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
                                  checked=""
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
                                />
                                <label for="collect_info_disagree"
                                  >동의하지 않음</label
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="checkbox-survey">
                    <div class="checkBox">
                      <input
                        type="checkbox"
                        name="agree_chk"
                        id="c_survey_privacy2"
                        class="blind"
                        value="survey"
                        checked="true"
                      />
                      <label for="c_survey_privacy2"
                        ><span>선택</span>채용마케팅 활용을 위한 개인정보
                        동의</label
                      >
                      <button class="toggle-label"></button>
                    </div>
                    <div class="sheet-wrap animate-up">
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
                                메리츠 파트너스 채용 서비스 관련 정보 제공 및
                                안내<br />
                                채용 이벤트 및 프로모션 안내<br />
                                채용 시장 조사 및 서비스 품질 향상
                              </p>
                              <p>
                                <b>보유 및 이용 기간</b>
                                본 동의서에 따라 수집된 개인정보는 수집일로부터
                                1년 간 보관되며,<br />
                                이후 안전하게 폐기됩니다.
                              </p>
                              <p>
                                <b>수집·이용 항목</b>
                                개인(신용) 정보 : 성명, 거주지, 연령대, 성별,
                                전화번호, 상담가능시간, 직업
                              </p>
                              <p>
                                <b>동의 거부 권리 및 불이익</b>
                                귀하는 본 동의를 거부하실 수 있으며, 거부하신
                                경우에도 ‘메리츠 파트너스’ 서비스 이용에는
                                제한이 없습니다.<br />
                                다만, 마케팅 정보 제공 등 부가 혜택 안내가
                                제한될 수 있습니다.
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
                                  checked=""
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
                                  checked
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
                                />
                                <label for="sns_disagree">동의하지 않음</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="checkbox-survey">
                    <div class="checkBox">
                      <input
                        type="checkbox"
                        name="agree_chk"
                        id="stndHrexRciAgrYn2"
                        class="blind"
                        value="stndHrexRciAgrYn"
                        checked="true"
                      />
                      <label for="stndHrexRciAgrYn2"
                        ><span>선택</span>업무 시간 외 AI 안내전화를 위한 수신
                        동의</label
                      >
                      <button class="toggle-label"></button>
                    </div>
                    <div class="sheet-wrap animate-up">
                      <div class="sheet-header">
                        <p class="desc">
                          *본 동의서는 메리츠 파트너스가 개인정보처리자로서
                          수집·이용합니다.
                        </p>
                      </div>
                      <div class="sheet-contents">
                        <div class="terms-desc">
                          <div class="desc-wrap">
                            <h4>1. 수집·이용에 관한 사항</h4>
                            <div class="notice">
                              <p>
                                <b>수집·이용 목적</b>
                                메리츠 파트너스 업무 외 시간 AI 상담 진행 관련
                                안내
                              </p>
                              <p>
                                <b>보유 및 이용 기간</b>
                                본 동의서에 따라 수집된 개인정보는 수집일로부터
                                1년 간 보관되며,<br />
                                이후 안전하게 폐기됩니다.
                              </p>
                              <p>
                                <b>수집·이용 항목</b>
                                성명, 거주지, 연령대, 성별, 전화번호,
                                상담가능시간, 직업
                              </p>
                              <p>
                                <b>동의 거부 권리 및 불이익</b>
                                귀하는 본 동의를 거부하실 수 있으며,<br />
                                거부하신 경우에도 메리츠 파트너스 서비스
                                이용에는 제한이 없습니다.<br />
                                다만, 미동의 시 안내전화는
                                영업시간(09:00~21:00)에만 발신됩니다.
                              </p>
                            </div>
                          </div>
                          <div class="agreement">
                            <p class="text-red">
                              업무 외 시간(21:00 ~ 익일 09:00) AI 자동 발신
                              안내전화 수신에 동의합니다.
                            </p>
                            <div class="privacy-check">
                              <div class="check-agree">
                                <input
                                  type="radio"
                                  name="stndHrexRciAg_chk2"
                                  id="stndHrexRciAg-agree2"
                                  class="blind"
                                  value="true"
                                  checked
                                />
                                <label for="stndHrexRciAg-agree2">동의함</label>
                              </div>
                              <div class="check-disagree">
                                <input
                                  type="radio"
                                  name="stndHrexRciAg_chk2"
                                  id="stndHrexRciAg-disagree2"
                                  class="blind"
                                  value="false"
                                />
                                <label for="stndHrexRciAg-disagree2"
                                  >동의하지 않음</label
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btnBox">
                  <button class="next btn" id="resultButton">
                    동의하고 시작하기
                  </button>
                </div>
              </div>
              <div class="step step06">
                <div class="resultBox">
                  <span id="desired_time" style="display: none"></span>
                  <img src="/2604DT/images/img_result.png" alt="" />
                  <p>
                    제출을 완료했어요!<br />
                    곧 상담원이 연락드릴거에요
                  </p>
                  <button class="successResult">확인했어요</button>
                </div>
              </div>
            </div>
`;

// 페이지 로드 후 form 내용을 동적으로 삽입
document.addEventListener("DOMContentLoaded", function () {
  const areaForm = document.getElementById("sheet-form");
  if (areaForm) {
    areaForm.classList.add("sheet-form");
    areaForm.innerHTML = formBoxHtml;
  }

  let currentStep = 0;
  let steps = [];

  /** ----------------------------
   * STEP 이동
   * ---------------------------- */
  function showStep(n, isPrev = false) {
    if (n < 0 || n >= steps.length) return;
    if (currentStep === n) return;

    // 👉 다음일 때만 validation
    if (!isPrev) {
      const valid = checkCurrentStep();
      if (!valid) return;
    }

    steps[currentStep].classList.remove("active");
    steps[n].classList.add("active");

    currentStep = n;
  }

  /** ----------------------------
   * 유효성 체크
   * ---------------------------- */
  function checkCurrentStep() {
    const el = document.getElementById("sheet-counsel");
    if (el.classList.contains("open")) return;
    // step01
    if (currentStep === 0) {
      const name = document.querySelector("#user_name2").value.trim();
      const phone = document.querySelector("#user_call2").value.trim();

      if (!name) {
        alert("이름을 입력해주세요");
        return false;
      }

      if (!phone || phone.length < 10) {
        alert("휴대폰 번호를 입력해주세요");
        return false;
      }
    }

    // step02
    if (currentStep === 1) {
      const sido = document.querySelector("#user_sido2").value;
      const gugun = document.querySelector("#user_gugun2").value;

      if (!sido || !gugun) {
        alert("지역을 선택해주세요");
        return false;
      }
    }

    // step03
    if (currentStep === 2) {
      const age = document.querySelector("#payment2").value;
      const job = document.querySelector("#job_div_cd2").value;

      if (!age || !job) {
        alert("나이와 직업을 선택해주세요");
        return false;
      }
    }

    // step04
    if (currentStep === 3) {
      const time = document.querySelector("#cns_req_hr_div_cd2").value;

      if (!time) {
        alert("상담 시간을 선택해주세요");
        return false;
      }
    }

    // step05
    if (currentStep === 4) {
      const terms = document.querySelector("#c_terms2");

      if (!terms.checked) {
        alert("필수 약관에 동의해주세요");
        return false;
      }

      save2();
      return false;
    }

    return true;
  }

  const initializeStepForm = () => {
    steps = document.querySelectorAll(".form_box .step");
    if (!steps.length) return;

    /** ----------------------------
     * 🔥 next 버튼 (단일 이벤트로 통일)
     * ---------------------------- */
    document.querySelectorAll(".next").forEach((btn) => {
      btn.addEventListener("click", () => {
        showStep(currentStep + 1);
      });
    });

    /** ----------------------------
     * prev 버튼
     * ---------------------------- */
    document.querySelectorAll(".prev").forEach((btn) => {
      btn.addEventListener("click", () => {
        showStep(currentStep - 1, true);
      });
    });

    /** ----------------------------
     * STEP02 자동 이동
     * ---------------------------- */
    const userSido = document.querySelector("#user_sido2");
    const userGugun = document.querySelector("#user_gugun2");

    userSido?.addEventListener("change", () => {
      if (userSido.value && userGugun.value) {
        showStep(2);
      }
    });

    userGugun?.addEventListener("change", () => {
      if (userSido.value && userGugun.value) {
        showStep(2);
      }
    });

    /** ----------------------------
     * STEP03 자동 이동
     * ---------------------------- */
    const payment = document.querySelector("#payment2");
    const job = document.querySelector("#job_div_cd2");

    payment?.addEventListener("change", () => {
      if (payment.value && job.value) {
        showStep(3);
      }
    });

    job?.addEventListener("change", () => {
      if (payment.value && job.value) {
        showStep(3);
      }
    });

    /** ----------------------------
     * STEP04 자동 이동
     * ---------------------------- */
    const timeSelect = document.querySelector("#cns_req_hr_div_cd2");

    timeSelect?.addEventListener("change", () => {
      if (timeSelect.value) {
        showStep(4);
      }
    });

    /** ----------------------------
     * 리셋
     * ---------------------------- */
    function resetForm() {
      document.querySelectorAll("input, select").forEach((el) => {
        if (el.type === "checkbox" || el.type === "radio") {
          el.checked = false;
        } else {
          el.value = "";
        }
      });

      steps.forEach((step) => step.classList.remove("active"));
      steps[0].classList.add("active");

      currentStep = 0;
    }

    document
      .querySelector(".resultBox button")
      ?.addEventListener("click", resetForm);
  };

  /** ----------------------------
   * API
   * ---------------------------- */
  function submitForm() {
    console.log("API 호출");

    axios
      .post("/api/submit", {})
      .then((res) => {
        window.successCallback2(res.data);
      })
      .catch(() => {
        alert("제출 실패");
      });
  }

  /** ----------------------------
   * success
   * ---------------------------- */
  window.successCallback2 = (data) => {
    showStep(5, true);
  };

  const initializeConsentAccordion = () => {
    const items = document.querySelectorAll(
      ".checkbox-privacy, .checkbox-survey",
    );

    items.forEach((item) => {
      const label = item.querySelector(".toggle-label");

      label?.addEventListener("click", (e) => {
        e.preventDefault(); // 체크박스 영향 방지

        const isActive = item.classList.contains("active");

        // // 👉 전체 닫기 (아코디언)
        // items.forEach((el) => el.classList.remove("active"));

        // 👉 현재만 토글
        if (!isActive) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
  };

  const initializeConsentSync = () => {
    const setRadioValue = (scope, name, value) => {
      scope.querySelectorAll(`input[name="${name}"]`).forEach((radio) => {
        radio.checked = radio.value === value;
      });
    };

    const syncSingleConsent = (checkboxSelector, radioName) => {
      const checkbox = document.querySelector(checkboxSelector);
      const scope = checkbox?.closest(".step");
      const radios = scope?.querySelectorAll(`input[name="${radioName}"]`);

      if (!checkbox || !scope || !radios.length) return;

      checkbox.addEventListener("change", () => {
        setRadioValue(scope, radioName, checkbox.checked ? "true" : "false");
      });

      radios.forEach((radio) => {
        radio.addEventListener("change", () => {
          if (!radio.checked) return;
          checkbox.checked = radio.value === "true";
        });
      });
    };

    const syncMultiConsent = (checkboxSelector, radioNames) => {
      const checkbox = document.querySelector(checkboxSelector);
      const scope = checkbox?.closest(".step");

      if (!checkbox || !scope) return;

      checkbox.addEventListener("change", () => {
        const value = checkbox.checked ? "true" : "false";
        radioNames.forEach((name) => setRadioValue(scope, name, value));
      });

      radioNames.forEach((name) => {
        scope.querySelectorAll(`input[name="${name}"]`).forEach((radio) => {
          radio.addEventListener("change", () => {
            if (!radio.checked) return;

            checkbox.checked = radioNames.every(
              (targetName) =>
                scope.querySelector(`input[name="${targetName}"][value="true"]`)
                  ?.checked,
            );
          });
        });
      });
    };

    syncSingleConsent("#c_terms2", "collect_info_chk");
    syncMultiConsent("#c_survey_privacy2", [
      "survey_privacy_chk",
      "survey_privacy_chk2",
    ]);
    syncSingleConsent("#stndHrexRciAgrYn2", "stndHrexRciAg_chk2");
  };

  initializeStepForm();
  initializeConsentAccordion();
  initializeConsentSync();

  document.querySelector(".successResult")?.addEventListener("click", () => {
    document.querySelector(".section01")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  //지역리스트 출력
  $(function () {
    areaSelectMaker("#user_sido2", "#user_gugun2");
  });
  var areaSelectMaker = function (a2, a3) {
    if (a2 == null || a3 == null) {
      console.warn("Unkwon Area Tag");
      return;
    }

    var area = {
      서울: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ],
      경기: [
        "수원시",
        "성남시",
        "의정부시",
        "안양시",
        "부천시",
        "광명시",
        "평택시",
        "동두천시",
        "안산시",
        "고양시",
        "과천시",
        "구리시",
        "남양주시",
        "오산시",
        "시흥시",
        "군포시",
        "의왕시",
        "하남시",
        "용인시",
        "파주시",
        "이천시",
        "안성시",
        "김포시",
        "화성시",
        "광주시",
        "양주시",
        "포천시",
        "여주시",
        "연천군",
        "가평군",
        "양평군",
      ],
      인천: [
        "계양구",
        "미추홀구",
        "남동구",
        "동구",
        "부평구",
        "서구",
        "연수구",
        "중구",
        "강화군",
        "옹진군",
      ],
      강원: [
        "춘천시",
        "원주시",
        "강릉시",
        "동해시",
        "태백시",
        "속초시",
        "삼척시",
        "홍천군",
        "횡성군",
        "영월군",
        "평창군",
        "정선군",
        "철원군",
        "화천군",
        "양구군",
        "인제군",
        "고성군",
        "양양군",
      ],
      충북: [
        "청주시",
        "충주시",
        "제천시",
        "보은군",
        "옥천군",
        "영동군",
        "증평군",
        "진천군",
        "괴산군",
        "음성군",
        "단양군",
      ],
      충남: [
        "천안시",
        "공주시",
        "보령시",
        "아산시",
        "서산시",
        "논산시",
        "계룡시",
        "당진시",
        "금산군",
        "부여군",
        "서천군",
        "청양군",
        "홍성군",
        "예산군",
        "태안군",
      ],
      대전: ["대덕구", "동구", "서구", "유성구", "중구"],
      세종특별자치시: ["세종특별자치시"],
      전북: [
        "전주시",
        "군산시",
        "익산시",
        "정읍시",
        "남원시",
        "김제시",
        "완주군",
        "진안군",
        "무주군",
        "장수군",
        "임실군",
        "순창군",
        "고창군",
        "부안군",
      ],
      전남: [
        "목포시",
        "여수시",
        "순천시",
        "나주시",
        "광양시",
        "담양군",
        "곡성군",
        "구례군",
        "고흥군",
        "보성군",
        "화순군",
        "장흥군",
        "강진군",
        "해남군",
        "영암군",
        "무안군",
        "함평군",
        "영광군",
        "장성군",
        "완도군",
        "진도군",
        "신안군",
      ],
      광주: ["광산구", "남구", "동구", "북구", "서구"],
      경북: [
        "포항시",
        "경주시",
        "김천시",
        "안동시",
        "구미시",
        "영주시",
        "영천시",
        "상주시",
        "문경시",
        "경산시",
        "군위군",
        "의성군",
        "청송군",
        "영양군",
        "영덕군",
        "청도군",
        "고령군",
        "성주군",
        "칠곡군",
        "예천군",
        "봉화군",
        "울진군",
        "울릉군",
      ],
      경남: [
        "창원시",
        "진주시",
        "통영시",
        "사천시",
        "김해시",
        "밀양시",
        "거제시",
        "양산시",
        "의령군",
        "함안군",
        "창녕군",
        "고성군",
        "남해군",
        "하동군",
        "산청군",
        "함양군",
        "거창군",
        "합천군",
      ],
      부산: [
        "강서구",
        "금정구",
        "남구",
        "동구",
        "동래구",
        "부산진구",
        "북구",
        "사상구",
        "사하구",
        "서구",
        "수영구",
        "연제구",
        "영도구",
        "중구",
        "해운대구",
        "기장군",
      ],
      대구: [
        "남구",
        "달서구",
        "동구",
        "북구",
        "서구",
        "수성구",
        "중구",
        "달성군",
      ],
      울산: ["남구", "동구", "북구", "중구", "울주군"],
      제주특별자치도: ["서귀포시", "제주시"],
    };

    //초기화
    init(true);

    var search_sido = ``;
    var search_gugun = ``;

    //권역 기본 생성
    var areaKeys1 = Object.keys(area);
    areaKeys1.forEach(function (Region) {
      var a1_selected = "";

      if (search_sido == Region) {
        a1_selected = "selected";
      }
      $(a2).append(
        "<option value=" +
          Region +
          " " +
          a1_selected +
          ">" +
          Region +
          "</option>",
      );
    });

    if (search_sido) {
      init();

      var Do = search_sido;
      var keys = Object.keys(area[Do]);
      keys.forEach(function (SiGunGu) {
        var a2_selected = "";
        if (search_gugun == area[Do][SiGunGu]) {
          a2_selected = "selected";
        }
        $(a3).append(
          "<option value=" +
            area[Do][SiGunGu] +
            " " +
            a2_selected +
            ">" +
            area[Do][SiGunGu] +
            "</option>",
        );
      });
    }

    //변경 이벤트
    $(document).on("change", a2, function () {
      init();
      var Do = $(this).val();
      var keys = Object.keys(area[Do]);
      keys.forEach(function (SiGunGu) {
        $(a3).append(
          "<option value=" +
            area[Do][SiGunGu] +
            ">" +
            area[Do][SiGunGu] +
            "</option>",
        );
      });
    });

    function init(second) {
      second ? $(a2).empty().append("<option value=''>시/도</option>") : "";
      $(a3).empty().append("<option value=''>시/군/구</option>");
    }
  };

  const save2 = async () => {
    if ($("#is_saved").val() == "Y") {
      return;
    }

    const url = new URL(window.location.href);
    const urlParams = url.searchParams;
    const advtMdiaDivVal = urlParams.get("advtMdiaDivVal") || "none";
    const advtMdiaDtlDivVal = urlParams.get("advtMdiaDtlDivVal") || "none";
    const advtMdiaTpDivVal = urlParams.get("advtMdiaTpDivVal") || "none";

    const fnm = $("#user_name2").val().trim();
    const ctp = $("#user_call2").val();
    const sido = $("#user_sido2").val();
    const gugun = $("#user_gugun2").val();
    const isHide_cns_req_hr_div_cd = $("#cns_req_hr_div_cd2")
      .closest(".input_item")
      .hasClass("hide");
    const cns_req_hr_div_cd = $("#cns_req_hr_div_cd2").val();
    const agr_tp_cd = $("#c_terms2").is(":checked");
    const cho_agr_yn = $("#c_survey_privacy2").is(":checked");
    const c_survey_privacy = $("#c_terms2").is(":checked");
    const stndHrexRciAgr = $("#stndHrexRciAgrYn2").is(":checked");
    const job_div_cd = $("#job_div_cd2").val();
    const hop_prem_div_cd = $("#payment2").val(); //연령대
    const orgCd = $("#orgCd2").val();

    const advt_mdia_div_val = advtMdiaDivVal;
    const advt_mdia_tp_div_val = advtMdiaTpDivVal;
    const advt_mdia_dtl_div_val = advtMdiaDtlDivVal;
    const agr_md_cd = "27";
    const choAgrYn = cho_agr_yn ? "Y" : "N"; // 채용마케팅 활용을 위한 개인정보 동의(선택)
    const qstAgrYn = c_survey_privacy ? "Y" : "N"; //채용상담을 위한 개인신용정보 동의서(필수)
    const stndHrexRciAgrYn = stndHrexRciAgr ? "Y" : "N"; //야간 시간 상담 동의

    // 숫자만 남김
    const cleanedCtp = ctp.replace(/[^0-9]/g, "");

    // 앞자리 추출
    const prefix = cleanedCtp.substring(0, 3);
    const suffix = cleanedCtp.slice(3);

    const isMobilePrefix = ["010", "011"].includes(prefix);

    // 길이 검사
    const isValidLength = isMobilePrefix && cleanedCtp.length === 11;

    if (isEmpty(fnm)) {
      return alert("한글 이름을 정확하게 입력해 주세요.");
    }

    if (!isCleanWords(fnm)) {
      return alert(
        "이름에 부적절한 단어가 포함되어 있습니다.\n다시 입력해 주세요.",
      );
    }

    const nameValidationMessage = isVaildName(fnm);
    if (nameValidationMessage) {
      return alert(nameValidationMessage);
    }

    if (checkEachCharacterKoreanInput(fnm)) {
      return alert("입력하신 성함을 다시 한 번 확인 해주세요.");
    }

    if (
      isEmpty(ctp) ||
      !isValidLength ||
      blockedNumbers.includes(suffix) ||
      blockedaLists.includes(cleanedCtp)
    ) {
      return alert("휴대전화 번호를 정확하게 입력해 주세요.");
    }

    if (isEmpty(sido) || isEmpty(gugun)) {
      return alert("필수 항목인 거주 지역을 선택해 주세요.");
    }

    if (
      !isHide_cns_req_hr_div_cd &&
      (isEmpty(cns_req_hr_div_cd) || !cns_req_hr_div_cd)
    ) {
      return alert("필수 항목인 상담가능시간을 선택해 주세요.");
    }

    if (isEmpty(agr_tp_cd) || !agr_tp_cd) {
      return alert("필수약관 동의 후 상담 신청이 가능합니다.");
    }

    // GTM 변경작업 카울리 user_id 추가
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      user_id: ctp,
    });

    // 쿠키에서 현재 시간 읽기
    const savedTime = getSavedCurrentTime();
    const currentTime = new Date().toISOString();
    const useTime = calculateTimeDifferenceInSeconds(savedTime, currentTime);

    const data = {
      fnm: fnm,
      ctp: ctp,
      actArCd: sido + "_" + gugun,
      cnsReqHrDivCd: isHide_cns_req_hr_div_cd ? "16" : cns_req_hr_div_cd,
      advtMdiaDivVal: advt_mdia_div_val,
      advtMdiaTpDivVal: advt_mdia_tp_div_val,
      advtMdiaDtlDivVal: advt_mdia_dtl_div_val,
      agrMdCd: agr_md_cd,
      agrTpCd: "01",
      choAgrYn: choAgrYn,
      qstAgrYn: qstAgrYn,
      stndHrexRciAgrYn,
      jobDivCd: job_div_cd,
      hopPremDivCd: hop_prem_div_cd,
      regDivCd: "01",
      useSs: useTime,
      orgCd: "",
      click_key: clickKey,
    };

    await save_consultation_information2(data);

    $("#is_saved").val("N");
  };

  if (rootHost === "localhost:8080" || rootHost === "127.0.0.1:8080") {
    API_URL = "http://localhost:8000";
  } else if (rootHost === "d3pe848gj1yr9u.cloudfront.net") {
    API_URL = "https://mp-api-dev.madup.com";
  } else if (rootHost === "d18zyg7q8c0orb.cloudfront.net") {
    API_URL = "https://mp-api.madup.com";
  } else if (rootHost === "dev.meritzpartners.com") {
    API_URL = "https://dev-api.meritzpartners.com";
  } else {
    API_URL = "https://api.meritzpartners.com";
  }

  const save_consultation_information2 = async (data) => {
    const sendBtn = document.getElementById("resultButton");
    //채용관련 안내 텍스트
    sendBtn.disabled = true;
    sendBtn.textContent = "전송중";
    try {
      const response = await fetch(
        `${API_URL}/meritz/consultation-information`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const text = await response.text();
      const result = text ? JSON.parse(text) : null;

      if (
        (response.status === 200 && result.errCd === "00001") ||
        response.status === 204
      ) {
        const eventId = crypto.randomUUID();
        dataLayer.push({ event: "complete", event_id: eventId });
        if (window.successCallback2) {
          return successCallback2(desired_time);
        }
      } else {
        const resData = await response.json();
        throw new Error(resData.detail);
      }
    } catch (error) {
      console.log(error);
      dataLayer.push({ event: "failure" });
      alert(error.message);
    }
  };
});
