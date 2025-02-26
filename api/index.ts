import express, { Request, Response, Application } from "express";
import axios from "axios";

const app: Application = express();

app.get("/api/eum", async (req: Request, res: Response): Promise<void> => {
    console.log("✅ API 요청이 들어왔습니다:", req.query);

    try {
        // 🔹 req.query의 값을 string으로 변환
        const areaCd = String(req.query.areaCd);
        const type = String(req.query.type);
        const uname = req.query.uname ? String(req.query.uname) : ""; // 만약 없으면 빈 문자열

        if (!areaCd || !type) {
            console.log("❌ 요청 실패: 필수 파라미터가 없음");
            res.status(400).json({ error: "필수 파라미터가 누락되었습니다." });
            return;
        }

        console.log(`✅ 요청 처리 중... (areaCd: ${areaCd}, type: ${type}, uname: ${uname})`);

        const api_url = "https://api.eum.go.kr/web/Rest/OP/searchZone?";

        const requestParams = {
            id: "ybg",
            key: "Wj0PNO4WCAAsndHQkqLz5A==",
            areaCd,
            type,
            uname,
        };

        // 🔹 **실제 API 요청 URL을 콘솔에 출력 (쿼리스트링을 encodeURIComponent 적용)**
        const requestURL = `${api_url}id=${encodeURIComponent(requestParams.id)}&key=${encodeURIComponent(requestParams.key)}&areaCd=${encodeURIComponent(requestParams.areaCd)}&type=${encodeURIComponent(requestParams.type)}&uname=${encodeURIComponent(requestParams.uname)}`;
        console.log(`🔍 실제 API 요청 URL: ${requestURL}`);

        // 🔹 실제 API 호출
        const response = await axios.get(api_url, {
            params: requestParams,
            responseType: "arraybuffer",
        });

        // 🔹 응답을 UTF-8로 변환하여 한글 깨짐 방지
        const decodedData = Buffer.from(response.data, "binary").toString("utf-8");

        // 🔹 서버에서 UTF-8 인코딩을 명확하게 설정
        res.setHeader("Content-Type", "application/xml; charset=utf-8");

        console.log("✅ 응답 성공!");
        res.send(decodedData);
    } catch (error: any) {
        console.error("❌ API 요청 중 오류 발생:", error.response?.status || error.message);
        res.status(error.response?.status || 500).send("API 요청 실패");
    }
});

app.listen(3000, () => {
    console.log("🚀 서버가 3000번 포트에서 실행 중입니다.");
});
