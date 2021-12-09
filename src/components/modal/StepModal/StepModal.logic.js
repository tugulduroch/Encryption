import mainWorker from "../../../worker/worker";
import FileSaver from "file-saver";
import {
    Modal
} from "antd";

export const initialize = (props) => {
    let steps = [];

    if (props.files.mode !== "decrypt") {
        if (props.files.mode === "encrypt-multiple") {
            steps = ["Файл шифрлэж байна."];
        } else {
            steps = ["Файл шифрлэж байна."];
        };
        steps = [...steps,
            "Файл шифрлэж байна..",
            "Файл шифрлэж байна...",
            "Файл шифрлэж байна....",
            "Файл шифрлэж байна.....",
        ];
    } else {
        steps = [
            "Шифр тайлж байна.",
            "Шифр тайлж байна..",
            "Шифр тайлж байна...",
            "Шифр тайлж байна....",
            "Шифр тайлж байна.....",
        ];
    };

    const worker = mainWorker();

    props.setSteps(steps);

    worker.addEventListener("message", (e) => {
        if (e.data === "incrementProgress") {
            props.nextStep();
        };
    });


    if (props.files.mode === "encrypt-multiple") {
        worker.combineToZip(props.files.fileList).then((data) => {
            props.nextStep();
            worker.encrypt(data, "package.zip", props.files.password, props.files.hint).then((obj) => {
                Modal.success({
                    title: "Амжилттай",
                    content: "",
                    onOk: () => props.reset()
                });
                FileSaver.saveAs(obj.file, obj.name);
            });
        });
    } else if (props.files.mode === "encrypt") {
        worker.fileToData(props.files.fileList[0]).then((data) => {
            props.nextStep();
            worker.encrypt(data, props.files.fileList[0].name, props.files.password, props.files.hint).then((obj) => {
                Modal.success({
                    title: "Амжиилттай",
                    content: "Файл амжилттай шифрлэгдсэн тул та AE өргөтгөлтэй файлаа хадгалах боломжтой",
                    onOk: () => props.reset()
                });
                FileSaver.saveAs(obj.file, obj.name);
            });
        });
    } else {
        worker.decrypt(props.files.fileList[0], props.files.password).then((obj) => {
            if (obj.error == null) {
                Modal.success({
                    title: "Амжилттай",
                    content: "Амжилттай шифр тайлалт явагдсан тул таны файл татагдлаа.",
                    onOk: () => props.reset()
                });
                FileSaver.saveAs(obj.file, obj.name);
            } else {
                if (obj.error === "key-incorrect-or-corrupted") {
                    Modal.error({
                        title: "Нууц үг буруу байна",
                        content: "Шифер тайлалт амжилтгүй боллоо. Та нууц үгээ шалгана уу",
                        onOk: () => props.reset()
                    });
                }
            };
        });
    }
};