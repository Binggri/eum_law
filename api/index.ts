﻿import express, { Request, Response, Application } from "express";
import axios from "axios";

const app: Application = express();

app.get("/api/eum", async (req: Request, res: Response): Promise<void> => {
    console.log("✅ API 요청이 들어왔습니다:", req.query);

    try {
        const { areaCd, type, uname } = req.query;

        if (!areaCd || !type) {
            console.log("❌ 요청 실패: 필수 파라미터가 없음");
            res.status(400).json({ error: "필수 파라미터가 누락되었습니다." });
            return;
        }

        console.log(`✅ 요청 처리 중... (areaCd: ${areaCd}, type: ${type}, uname: ${uname})`);

        const api_url = "https://api.eum.go.kr/web/Rest/OP/searchZone";

        // ✅ **쿼리스트링을 URL 인코딩하여 한글 깨짐 방지**
        const requestParams = {
            id: encodeURIComponent("ybg"),
            key: encodeURIComponent("Wj0PNO4WCAAsndHQkqLz5A=="),
            areaCd: encodeURIComponent(areaCd as string),
            type: encodeURIComponent(type as string),
            uname: uname ? encodeURIComponent(uname as string) : "", // ✅ 한글 지원
        };

        // ✅ **🔍 실제 API 요청 URL을 콘솔에 출력**
        const requestURL = `${api_url}?id=${requestParams.id}&key=${requestParams.key}&areaCd=${requestParams.areaCd}&type=${requestParams.type}&uname=${requestParams.uname}`;
        console.log(`🔍 실제 API 요청 URL: ${requestURL}`);

        // ✅ **axios로 API 요청 (쿼리스트링 자동 적용)**
        const response = await axios.get(api_url, {
            params: requestParams,
            responseType: "arraybuffer",
        });

        // ✅ **응답을 UTF-8로 변환하여 한글 깨짐 방지**
        const decodedData = Buffer.from(response.data, "binary").toString("utf-8");

        // ✅ **Vercel 서버에서 UTF-8 인코딩을 명확하게 설정**
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        console.log("✅ 응답 성공!");

        // ✅ 클라이언트에서도 `requestURL` 확인 가능하도록 응답 JSON에 포함
        res.json({
            success: true,
            requestURL,  // 🔍 **실제 요청 URL 포함**
            response: decodedData,  // API 응답 본문
        });

        return;
    } catch (error: any) {
        console.error("❌ API 요청 중 오류 발생:", error.response?.status || error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.status || "API 요청 실패",
        });
        return;
    }
});

// ✅ 서버 실행
app.listen(3000, () => {
    console.log("🚀 서버가 3000번 포트에서 실행 중입니다.");
});
