import express, { Request, Response, Application } from "express";
import axios from "axios";

const app: Application = express();

app.get("/api", async (req: Request, res: Response) => {
    console.log("✅ API 요청이 들어왔습니다:", req.query);

    try {
        const { areaCd, type, uname } = req.query;

        if (!areaCd || !type) {
            console.log("❌ 요청 실패: 필수 파라미터가 없음");
            res.status(400).json({ error: "필수 파라미터가 누락되었습니다." });
            return;
        }

        console.log(`✅ 요청 처리 중... (areaCd: ${areaCd}, type: ${type}, uname: ${uname})`);

        const api_url = "https://api.eum.go.kr/web/Rest/OP/searchZone?";

        // ✅ `URLSearchParams`를 사용하여 자동으로 URL 인코딩된 쿼리스트링 생성
        const requestParams = new URLSearchParams({
            id: "ybg",
            key: "Wj0PNO4WCAAsndHQkqLz5A==",
            areaCd: String(areaCd),
            type: String(type),
            uname: uname ? String(uname) : "", // uname이 없을 경우 빈 문자열 처리
        });

        // ✅ 최종 API 요청 URL 출력
        const requestURL = `${api_url}${requestParams.toString()}`;
        console.log(`🔍 실제 API 요청 URL: ${requestURL}`);

        const response = await axios.get(requestURL, {
            responseType: "arraybuffer",
        });

        // ✅ 응답을 UTF-8로 변환하여 한글 깨짐 방지
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

// ✅ 서버 실행 시, API 테스트 URL을 출력하여 확인
const PORT = 3000;
app.listen(PORT, () => {
    const testURL = `http://127.0.0.1:${PORT}/api?areaCd=11140&type=S&uname=주거지역`;
    console.log(`🚀 서버가 ${PORT}번 포트에서 실행 중입니다.`);
    console.log(`🔗 테스트 URL: ${testURL}`);
});
