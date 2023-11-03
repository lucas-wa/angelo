const leapWebhookSecret = `ILEFZUqiQBnhmp2qvhFypoEgCDn9KjOF`;


export async function POST(request) {

    const incomingData = await request.json();
    const urlObj = new URL(request.url);
    const model_id = urlObj.searchParams.get("model_id");
    const webhook_secret = urlObj.searchParams.get("webhook_secret");
    const result = incomingData?.result;

    try {
        const images = result.images;

            

        return NextResponse.json(
            {
                message: "success",
            },
            { status: 200, statusText: "Success" }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                message: "Something went wrong!",
            },
            { status: 500, statusText: "Something went wrong!" }
        );
    }

}