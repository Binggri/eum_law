import express, { Request, Response, Application } from "express";
import axios from "axios";

const app: Application = express();

const api_url = "https://api.eum.go.kr/web/Rest/OP/searchZone?";

app.get("/api/eum", async (req: Request, res: Response): Promise<void> => {
    console.log("✅ API 요청이 들어왔습니다:", req.query);

    try {
        // ✅ 요청 파라미터 확인
        const { areaCd, type, uname } = req.query;

        if (!areaCd || !type) {
            console.log("❌ 요청 실패: 필수 파라미터가 없음");
            res.status(400).json({ error: "필수 파라미터가 누락되었습니다." });
            return;
        }

        // ✅ 실제 요청 URL을 로그로 출력하여 확인 (디버깅용)
        const requestUrl = `${api_url}id=ybg&key=Wj0PNO4WCAAsndHQkqLz5A==&areaCd=${areaCd}&type=${type}&uname=${uname || ""}`;
        console.log("🔍 실제 API 요청 URL:", requestUrl);

        // ✅ API 요청 실행
        const response = await axios.get(api_url, {
            params: {
                id: "ybg",
                key: "Wj0PNO4WCAAsndHQkqLz5A==",
                areaCd,
                type,
                uname: uname || "", // 선택적 파라미터 처리
            },
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

// ✅ Vercel 배포용 (`app.listen` 사용 X)
export default app;
