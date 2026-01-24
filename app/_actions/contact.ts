"use server";

function validateEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export async function createContact(_prevState: any, formData: FormData) {
    const pickValue = (key: string) => {
        const value = formData.get(key);
        return typeof value === "string" ? value : "";
    };

    const rawFormDate = {
        name: pickValue("name"),
        email: pickValue("email"),
        affiliation: pickValue("affiliation").trim(),
        portfolioUrl: pickValue("portfolioUrl").trim(),
        message: pickValue("message"),
    };

    if (!rawFormDate.name || rawFormDate.name.trim().length === 0) {
        return {
            status: "error",
            message: "お名前を入力してください。",
        };
    }

    if (!rawFormDate.email || rawFormDate.email.trim().length === 0) {
        return {
            status: "error",
            message: "メールアドレスを入力してください。",
        };
    }

    if (!validateEmail(rawFormDate.email)) {
        return {
            status: "error",
            message: "メールアドレスの形式が誤っています。",
        };
    }

    if (!rawFormDate.message || rawFormDate.message.trim().length === 0) {
        return {
            status: "error",
            message: "メッセージを入力してください。",
        };
    }
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;

    if (!portalId || !formId) {
        console.error("HubSpotの環境変数が設定されていません。");
        return {
            status: "error",
            message: "送信設定に不備があります。管理者へご連絡ください。",
        };
    }

    const result = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fields: [
                    {
                        objectTypeId: "0-1",
                        name: "name",
                        value: rawFormDate.name,
                    },
                    {
                        objectTypeId: "0-1",
                        name: "email",
                        value: rawFormDate.email,
                    },
                    ...(rawFormDate.affiliation
                        ? [
                            {
                                objectTypeId: "0-1" as const,
                                name: "affiliation",
                                value: rawFormDate.affiliation,
                            },
                        ]
                        : []),
                    ...(rawFormDate.portfolioUrl
                        ? [
                            {
                                objectTypeId: "0-1" as const,
                                name: "portfolio_url",
                                value: rawFormDate.portfolioUrl,
                            },
                        ]
                        : []),
                    {
                        objectTypeId: "0-1",
                        name: "message",
                        value: rawFormDate.message,
                    },
                ],
            }),
        }
    );

    try {
        await result.json();
    } catch (e) {
        console.error(e);
        return {
            status: "error",
            message: "送信中に問題が発生しました。時間を置いて再度お試しください。",
        };
    }
    return { status: "success", message: "OK" };
}