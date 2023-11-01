import { answerStateMapsState, userProfilesState } from "@/shared/store/state";
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import { RefObject, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export default function StyleCanvas() {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const [userProfiles] = useRecoilState(userProfilesState);
  const [answerStateMaps] = useRecoilState(answerStateMapsState);

  useEffect(() => {
    if (canvasRef?.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context !== null) {
        context.fillStyle = "white"; // 배경색 설정
        context.fillRect(0, 0, canvas.width, canvas.height); // 채우기
        const drawStylePreview = async () => {
          for (let idx = 0; idx < userProfiles.length; idx++) {
            const profile = userProfiles[idx];
            const profileImage = new Image();
            profileImage.src = profile.img;

            await new Promise((resolve, reject) => {
              profileImage.onload = resolve;
              profileImage.onerror = reject;
            });

            const x = 100;
            const y = 100 + (100 + 30) * idx + 45;
            const radius = 45;

            context.save(); // 현재 컨텍스트 설정 저장

            // 클리핑 영역을 원으로 설정
            context.beginPath();
            context.arc(x, y + 20, radius, 0, Math.PI * 2);
            context.closePath();
            context.clip();

            // 원 안에 이미지 그리기
            const imageSize = Math.min(profileImage.width, profileImage.height); // 이미지의 크기 중에서 작은 값을 기준으로 정사각형 크기 설정
            const sourceX = (profileImage.width - imageSize) / 2; // 이미지의 중앙에서 크롭할 위치 계산
            const sourceY = (profileImage.height - imageSize) / 2;
            const sourceSize = imageSize;

            context.drawImage(
              profileImage,
              sourceX,
              sourceY,
              sourceSize,
              sourceSize,
              x - radius,
              y + 20 - radius,
              radius * 2,
              radius * 2
            );

            context.restore(); // 이전 컨텍스트 설정으로 복원

            // 텍스트 그리기
            context.fillStyle = "black";
            context.textAlign = "center";
            context.font = "600 24px SUITE Variable"; // Adjust the font size here
            context.fillText(profile.username, x, y + 95); // Adjust the y position here

            // 우측에 문항 그리기
            const answerStateMap = answerStateMaps[idx];
            const answerKeys = Object.keys(answerStateMap);

            const answerTextY = y - radius;
            const answerTextX = x + radius + 160;

            // 이미지 너비와 높이 설정
            const imageWidth = 120; // 이미지 너비
            const imageHeight = 120; // 이미지 높이

            // 이미지 간격 설정
            const imageSpacingY = 0; // Y축 간격

            // answerKeys 그리기
            answerKeys.forEach((answerKey, answerIdx) => {
              const textX = answerTextX + answerIdx * imageWidth;
              const textY = answerTextY;

              if (idx === 0) {
                context.font = "700 36px SUITE Variable";
                context.fillText(answerKey, textX, textY);
              }

              const imageX = textX - 60;
              const imageY = answerTextY + imageSpacingY + 20;

              const memberImage = new Image();
              memberImage.src = answerStateMap[answerKey].memberImg;

              memberImage.onload = () => {
                context.drawImage(
                  memberImage,
                  imageX,
                  imageY,
                  imageWidth,
                  imageHeight
                );
              };
            });
          }
        };

        drawStylePreview();

        context.fillStyle = "black";
        context.textAlign = "right";
        context.font = "500 22px sans-serif";
        context.fillText(
          "@DevvTyga 개발자 타이가 - 스키즈 취향표",
          canvas.width - 10,
          canvas.height - 10
        );
      }
    }
  }, [canvasRef, userProfiles, answerStateMaps]);

  const saveAsImage = () => {
    if (canvasRef?.current) {
      const scale = 3; // 이미지 저장 시 크기를 3배로 확장
      const canvas = document.createElement("canvas");
      canvas.width = canvasRef.current.width * scale;
      canvas.height = canvasRef.current.height * scale;
      const context = canvas.getContext("2d");

      if (context) {
        context.scale(scale, scale);
        context.drawImage(canvasRef.current, 0, 0);

        canvas.toBlob((blob) => {
          saveAs(blob as Blob, "skz-style.png");
        });
      }
    }
  };

  return (
    <div className="bg-white w-full">
      <canvas
        ref={canvasRef}
        width={1400}
        height={1000}
        className="w-full bg-white"
      ></canvas>
      <div
        onClick={saveAsImage}
        className={`fixed rounded-[28px] left-1/2 -translate-x-1/2 text-center items-center justify-center py-[16px] bg-gray-900 text-white font-bold text-[13px] w-[85%] bottom-[35px] ${"block"}`}
      >
        저장하기
      </div>
    </div>
  );
}
