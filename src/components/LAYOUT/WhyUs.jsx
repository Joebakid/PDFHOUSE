import React from "react";

function WhyUs() {
  return (
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
                No logins, no barriers. Just click and download.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-start gap-4 border-t pt-6">
            <div className="bg-[#CDFFFE] rounded-full p-4 flex items-center justify-center w-[64px] h-[64px]">
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
  );
}

export default WhyUs;
