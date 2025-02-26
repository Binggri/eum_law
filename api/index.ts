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
        const requestParams = {
            id: "ybg",
            key: "Wj0PNO4WCAAsndHQkqLz5A==",
            areaCd,
            type,
            uname: uname || "", // uname이 없을 경우 빈 문자열 전달
        };

        // ✅ **🔍 실제 API 요청 URL을 콘솔에 출력**
        const requestURL = `${api_url}?id=${requestParams.id}&key=${requestParams.key}&areaCd=${requestParams.areaCd}&type=${requestParams.type}&uname=${requestParams.uname}`;
        console.log(`🔍 실제 API 요청 URL: ${requestURL}`);

        const response = await axios.get(api_url, {
            params: requestParams,
            responseType: "arraybuffer",
        });

        // ✅ 응답을 UTF-8로 변환하여 한글 깨짐 방지
        const decodedData = Buffer.from(response.data, "binary").toString("utf-8");

        // ✅ 서버에서 UTF-8 인코딩을 명확하게 설정
        res.setHeader("Content-Type", "application/xml; charset=utf-8");

        console.log("✅ 응답 성공!");
        res.send(decodedData);
        return;
    } catch (error: any) {
        console.error("❌ API 요청 중 오류 발생:", error.response?.status || error.message);
        res.status(error.response?.status || 500).send("API 요청 실패");
        return;
    }
});
