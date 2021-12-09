import React from "react";
import ContainerCSS from "./Container.module.css";
import FileSelect from "./fileselect/FileSelect";
import PasswordModal from "../../modal/PasswordModal/PasswordModal";
import StepModal from "../../modal/StepModal/StepModal";

const Container = (props) => {
	return (
		<div className={ContainerCSS.container}>
			<h1><center>Аюулгүй файл дамжуулах веб флатформ</center></h1>
			<h3>
				AES өргөтгөлийг ашиглан та өөрийн өгөгдөлөө нууцлан түүнийгээ өөр хүнд илгээснээр. Таны файл нууцлалтай горимд шилжих юм.
				Харин нууцлагдсан файлийг мөн адил энэ флатформ ашиглан задлах боломжтой.
			</h3>
			<PasswordModal />
			<StepModal />

			<FileSelect />
		</div>
	);
};

export default Container;
