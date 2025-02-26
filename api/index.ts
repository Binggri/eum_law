import express, { Request, Response, Application } from "express";
import axios from "axios";

const app: Application = express();

app.get("/api/eum", async (req: Request, res: Response): Promise<void> => {
    console.log("✅ API 요청이 들어왔습니다:", req.query);

    try {
        // ✅ 요청 파라미터 받기
        const { areaCd, type, uname } = req.query;

        if (!areaCd || !type) {
            console.log("❌ 요청 실패: 필수 파라미터가 없음");
            res.status(400).json({ error: "필수 파라미터가 누락되었습니다." });
            return;
        }

        console.log(`✅ 요청 처리 중... (areaCd: ${areaCd}, type: ${type}, uname: ${uname})`);

        // ✅ API 기본 URL
        const api_url = "https://api.eum.go.kr/web/Rest/OP/searchZone?";

        // ✅ 요청 파라미터 설정 (`uname`이 없으면 제외)
        const requestParams: any = {
            id: "ybg",
            key: "Wj0PNO4WCAAsndHQkqLz5A==",
            areaCd: areaCd,
            type: type,
        };

        if (uname) {
            requestParams.uname = uname;  // ✅ `uname` 값이 있을 경우만 추가
        }

        // ✅ 디버깅을 위한 API 요청 URL 로그 출력
        console.log("🔍 실제 API 요청 URL:", api_url, requestParams);

        // ✅ API 요청 실행
        const response = await axios.get(api_url, {
            params: requestParams,
            responseType: "arraybuffer",
        });

        // ✅ 응답을 UTF-8로 변환하여 한글이 깨지지 않도록 처리
        const decodedData = Buffer.from(response.data, "binary").toString("utf-8");

        // ✅ 서버에서 UTF-8 인코딩을 명확하게 설정
        res.setHeader("Content-Type", "application/xml; charset=utf-8");

        console.log("✅ 응답 성공!");
        res.send(decodedData);
    } catch (error: any) {
        console.error("❌ API 요청 중 오류 발생:", error.response?.status || error.message);
        res.status(error.response?.status || 500).send("API 요청 실패");
    }
});

// ✅ 서버 실행 (포트: 3000)
app.listen(3000, () => {
    console.log("🚀 서버가 3000번 포트에서 실행 중입니다.");
});
