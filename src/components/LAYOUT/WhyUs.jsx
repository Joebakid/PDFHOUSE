import React from "react";

function WhyUs() {
  return (
    <>
      <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto custom-container">
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-10">
          Why use PDF Home
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Image */}
          <div className="w-full lg:w-[40%]">
            <img
              alt="student"
              src="/img/students.png"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-8 w-full lg:w-[60%]">
            {/* Row 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#CDFFFE] rounded-full p-4 flex items-center justify-center w-[64px] h-[64px]">
                {/* Icon 1 */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 38.5V3.5H7V38.5H3.5ZM10.5 29.75V24.5H28V29.75H10.5ZM10.5 17.5V12.25H38.5V17.5H10.5Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">
                  Organized by Course & Department
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Easily find the exact material you’re looking for.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start gap-4 border-t pt-6">
              <div className="bg-[#CDFFFE] rounded-full p-4 flex items-center justify-center w-[64px] h-[64px]">
                {/* Icon 2 */}
                <svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_3_52"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="43"
                    height="43"
                  >
                    <rect
                      x="0.139282"
                      y="0.700562"
                      width="42"
                      height="42"
                      fill="#D9D9D9"
                    />
                  </mask>
                  <g mask="url(#mask0_3_52)">
                    <path
                      d="M12.3893 25.2006C11.4268 25.2006 10.6028 24.8579 9.91741 24.1724C9.23199 23.487 8.88928 22.6631 8.88928 21.7006C8.88928 20.7381 9.23199 19.9141 9.91741 19.2287C10.6028 18.5433 11.4268 18.2006 12.3893 18.2006C13.3518 18.2006 14.1757 18.5433 14.8612 19.2287C15.5466 19.9141 15.8893 20.7381 15.8893 21.7006C15.8893 22.6631 15.5466 23.487 14.8612 24.1724C14.1757 24.8579 13.3518 25.2006 12.3893 25.2006ZM12.3893 32.2006C9.47262 32.2006 6.99345 31.1797 4.95178 29.1381C2.91012 27.0964 1.88928 24.6172 1.88928 21.7006C1.88928 18.7839 2.91012 16.3047 4.95178 14.2631C6.99345 12.2214 9.47262 11.2006 12.3893 11.2006C14.3434 11.2006 16.1153 11.6818 17.7049 12.6443C19.2945 13.6068 20.5559 14.8756 21.4893 16.4506H36.8893L42.1393 21.7006L34.2643 29.5756L30.7643 26.9506L27.2643 29.5756L23.5455 26.9506H21.4893C20.5559 28.5256 19.2945 29.7943 17.7049 30.7568C16.1153 31.7193 14.3434 32.2006 12.3893 32.2006Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">
                  Instant Access
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  No logins, no barriers. Just click,read or download.
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-start gap-4 border-t pt-6">
              <div className="bg-[#CDFFFE] rounded-full p-4 flex items-center justify-center w-[64px] h-[64px]">
                {/* Icon 3 */}
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_3_62"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="42"
                    height="43"
                  >
                    <rect
                      width="42"
                      height="42"
                      transform="matrix(1 0 0 -1 0 42.0001)"
                      fill="#D9D9D9"
                    />
                  </mask>
                  <g mask="url(#mask0_3_62)">
                    <path
                      d="M21 14.0001L12.25 22.7501L14.7 25.2876L19.25 20.7376V35.0001H22.75V20.7376L27.3 25.2876L29.75 22.7501L21 14.0001ZM10.5 7.00012C9.5375 7.00012 8.71354 7.34283 8.02813 8.02825C7.34271 8.71366 7 9.53762 7 10.5001V15.7501H10.5V10.5001H31.5V15.7501H35V10.5001C35 9.53762 34.6573 8.71366 33.9719 8.02825C33.2865 7.34283 32.4625 7.00012 31.5 7.00012H10.5Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">
                  Upload or Request PDFs
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Missing something? Request it. Got notes? Upload them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full h-[2px] my-12 bg-gray-500"></div>

      <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto custom-container">
      

        {/* Duplicated Right Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mt-16">
          {/* Right Content */}
          <div className="flex flex-col gap-8 w-full lg:w-[60%]">
            {/* Row 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#CDFFFE] rounded-full p-4 flex items-center justify-center w-[64px] h-[64px]">
                {/* Icon 1 */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7677 24.9944H31.7677V7.49438H10.7677V24.9944ZM10.7677 28.4944C9.80523 28.4944 8.98127 28.1517 8.29586 27.4663C7.61044 26.7808 7.26773 25.9569 7.26773 24.9944V3.99438C7.26773 3.03188 7.61044 2.20793 8.29586 1.52251C8.98127 0.837093 9.80523 0.494385 10.7677 0.494385H31.7677C32.7302 0.494385 33.5542 0.837093 34.2396 1.52251C34.925 2.20793 35.2677 3.03188 35.2677 3.99438V24.9944C35.2677 25.9569 34.925 26.7808 34.2396 27.4663C33.5542 28.1517 32.7302 28.4944 31.7677 28.4944H10.7677ZM3.76773 35.4944C2.80523 35.4944 1.98127 35.1517 1.29586 34.4663C0.610439 33.7808 0.267731 32.9569 0.267731 31.9944V7.49438H3.76773V31.9944H28.2677V35.4944H3.76773Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">
                  In-browser Preview
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Quickly preview PDFs before you download — save time and data
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start gap-4 border-t pt-6">
              <div className="bg-[#CDFFFE] rounded-full p-4 flex items-center justify-center w-[64px] h-[64px]">
                {/* Icon 2 */}
                <svg
                  width="43"
                  height="22"
                  viewBox="0 0 43 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.0108 10.9944C17.1941 10.9944 16.5233 10.6881 15.9983 10.0756C15.4733 9.46313 15.2837 8.74855 15.4295 7.93188L15.9545 4.78188C16.1879 3.52772 16.7785 2.49959 17.7264 1.69751C18.6743 0.895426 19.7754 0.494385 21.0295 0.494385C22.3129 0.494385 23.4285 0.895426 24.3764 1.69751C25.3243 2.49959 25.915 3.52772 26.1483 4.78188L26.6733 7.93188C26.8191 8.74855 26.6295 9.46313 26.1045 10.0756C25.5795 10.6881 24.9087 10.9944 24.092 10.9944H18.0108ZM19.0608 7.49438H23.042L22.692 5.35064C22.6337 4.9423 22.4441 4.61418 22.1233 4.36626C21.8025 4.11834 21.4379 3.99438 21.0295 3.99438C20.6212 3.99438 20.2639 4.11834 19.9577 4.36626C19.6514 4.61418 19.4691 4.9423 19.4108 5.35064L19.0608 7.49438ZM5.45454 12.7006C4.78371 12.7298 4.20767 12.5986 3.72642 12.3069C3.24517 12.0152 2.93162 11.5631 2.78579 10.9506C2.72746 10.6881 2.71287 10.4256 2.74204 10.1631C2.77121 9.90063 2.84412 9.65272 2.96079 9.41938C2.96079 9.44855 2.94621 9.39022 2.91704 9.24438C2.85871 9.18605 2.71287 8.83605 2.47954 8.19439C2.42121 7.84439 2.46496 7.50897 2.61079 7.18813C2.75662 6.8673 2.94621 6.59022 3.17954 6.35688L3.26704 6.26938C3.32537 5.71522 3.55142 5.24855 3.94517 4.86938C4.33892 4.49022 4.82746 4.30063 5.41079 4.30063C5.49829 4.30063 5.77537 4.35897 6.24204 4.47564L6.37329 4.43188C6.51912 4.28605 6.70871 4.17668 6.94204 4.10376C7.17537 4.03084 7.42329 3.99438 7.68579 3.99438C8.00662 3.99438 8.291 4.04543 8.53892 4.14751C8.78683 4.24959 8.98371 4.40272 9.12954 4.60688C9.15871 4.60688 9.18058 4.61418 9.19517 4.62876C9.20975 4.64334 9.23162 4.65063 9.26079 4.65063C9.66912 4.6798 10.0264 4.80376 10.3327 5.02251C10.6389 5.24126 10.865 5.54022 11.0108 5.91938C11.0691 6.12355 11.091 6.32043 11.0764 6.51001C11.0618 6.69959 11.0254 6.88188 10.967 7.05688C10.967 7.08605 10.9816 7.14438 11.0108 7.23188C11.215 7.43605 11.3754 7.66209 11.492 7.91001C11.6087 8.15793 11.667 8.41314 11.667 8.67564C11.667 8.7923 11.5795 9.09855 11.4045 9.59439C11.3754 9.65272 11.3754 9.71105 11.4045 9.76939L11.492 10.4694C11.492 11.0819 11.2368 11.6069 10.7264 12.0444C10.216 12.4819 9.59621 12.7006 8.86704 12.7006H5.45454ZM35.0295 12.7444C34.067 12.7444 33.2431 12.4017 32.5577 11.7163C31.8722 11.0308 31.5295 10.2069 31.5295 9.24438C31.5295 8.89438 31.5806 8.56626 31.6827 8.26001C31.7847 7.95376 31.9233 7.6548 32.0983 7.36313L30.8733 6.26938C30.5816 6.03605 30.5306 5.74438 30.7202 5.39438C30.9097 5.04438 31.1795 4.86938 31.5295 4.86938H35.0295C35.992 4.86938 36.816 5.21209 37.5014 5.89751C38.1868 6.58293 38.5295 7.40688 38.5295 8.36938V9.24438C38.5295 10.2069 38.1868 11.0308 37.5014 11.7163C36.816 12.4017 35.992 12.7444 35.0295 12.7444ZM0.029541 21.4944V18.7381C0.029541 17.4548 0.678499 16.4267 1.97642 15.6538C3.27433 14.8808 4.95871 14.4944 7.02954 14.4944C7.40871 14.4944 7.77329 14.5017 8.12329 14.5163C8.47329 14.5308 8.80871 14.5673 9.12954 14.6256C8.72121 15.209 8.41496 15.8361 8.21079 16.5069C8.00662 17.1777 7.90454 17.8923 7.90454 18.6506V21.4944H0.029541ZM10.5295 21.4944V18.6506C10.5295 16.7548 11.4993 15.2236 13.4389 14.0569C15.3785 12.8902 17.9087 12.3069 21.0295 12.3069C24.1795 12.3069 26.717 12.8902 28.642 14.0569C30.567 15.2236 31.5295 16.7548 31.5295 18.6506V21.4944H10.5295ZM35.0295 14.4944C37.1295 14.4944 38.8212 14.8808 40.1045 15.6538C41.3879 16.4267 42.0295 17.4548 42.0295 18.7381V21.4944H34.1545V18.6506C34.1545 17.8923 34.0597 17.1777 33.8702 16.5069C33.6806 15.8361 33.3962 15.209 33.017 14.6256C33.3379 14.5673 33.666 14.5308 34.0014 14.5163C34.3368 14.5017 34.6795 14.4944 35.0295 14.4944ZM21.0295 15.8069C19.367 15.8069 17.8795 16.0256 16.567 16.4631C15.2545 16.9006 14.4816 17.4111 14.2483 17.9944H27.8545C27.592 17.4111 26.8118 16.9006 25.5139 16.4631C24.216 16.0256 22.7212 15.8069 21.0295 15.8069Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">
                  Community-Powered
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Made possible by class reps who care.
                </p>
              </div>
            </div>
          </div>

          {/* Left Image */}
          <div className="w-full lg:w-[40%]">
            <img
              alt="student"
              src="/img/student.png"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyUs;
