import { Paragraph } from "./typography";

const Loader = () => {
    return (
        <div className="layout fixed inset-0 z-999 grid place-items-center bg-black/60">
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 shadow-md">
                <div className="w-12 text-orange-600">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="12" r="3" opacity="1">
                            <animate
                                id="spinner_qYjJ"
                                begin="0;spinner_t4KZ.end-0.25s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            ></animate>
                        </circle>
                        <circle cx="12" cy="12" r="3" opacity=".4">
                            <animate begin="spinner_qYjJ.begin+0.15s" attributeName="opacity" dur="0.75s" values="1;.2" fill="freeze"></animate>
                        </circle>
                        <circle cx="20" cy="12" r="3" opacity=".3">
                            <animate
                                id="spinner_t4KZ"
                                begin="spinner_qYjJ.begin+0.3s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            ></animate>
                        </circle>
                    </svg>
                </div>
                <Paragraph weight="bold">Mohon Tunggu</Paragraph>
            </div>
        </div>
    );
};

export default Loader;

export const LoaderClient = () => {
    return (
        <div className="grid min-h-[40vh] place-items-center">
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg px-6 py-4">
                <div className="w-12 text-orange-600">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="12" r="3" opacity="1">
                            <animate
                                id="spinner_qYjJ"
                                begin="0;spinner_t4KZ.end-0.25s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            ></animate>
                        </circle>
                        <circle cx="12" cy="12" r="3" opacity=".4">
                            <animate begin="spinner_qYjJ.begin+0.15s" attributeName="opacity" dur="0.75s" values="1;.2" fill="freeze"></animate>
                        </circle>
                        <circle cx="20" cy="12" r="3" opacity=".3">
                            <animate
                                id="spinner_t4KZ"
                                begin="spinner_qYjJ.begin+0.3s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            ></animate>
                        </circle>
                    </svg>
                </div>
                <Paragraph weight="bold">Mohon Tunggu</Paragraph>
            </div>
        </div>
    );
};

export const LoaderPage = () => {
    return (
        <div className="grid min-h-[70vh] w-full place-items-center">
            <div className="flex flex-col items-center gap-1">
                <div className="w-12 text-orange-600">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="12" r="3" opacity="1">
                            <animate
                                id="spinner_qYjJ"
                                begin="0;spinner_t4KZ.end-0.25s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            ></animate>
                        </circle>
                        <circle cx="12" cy="12" r="3" opacity=".4">
                            <animate begin="spinner_qYjJ.begin+0.15s" attributeName="opacity" dur="0.75s" values="1;.2" fill="freeze"></animate>
                        </circle>
                        <circle cx="20" cy="12" r="3" opacity=".3">
                            <animate
                                id="spinner_t4KZ"
                                begin="spinner_qYjJ.begin+0.3s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            ></animate>
                        </circle>
                    </svg>
                </div>
                <Paragraph weight="bold">Mohon Tunggu</Paragraph>
            </div>
        </div>
    );
};
