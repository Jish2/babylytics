import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Container, Row, Alert, Form, Button } from "react-bootstrap";
import LoadingSpin from "react-loading-spin";
import "./styles/styles.css";
import logo from "./img/Babylytics Logo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Data from "./Data";

const fileTypes = ["CSV", "TXT"];

function App() {
	const [showData, setShowData] = useState(false);
	const [csvArray, setCsvArray] = useState([]);

	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);
	const [disableUpload, setDisableUpload] = useState(false);

	function handleFiles(files) {
		// Check for the various File API support.
		if (window.FileReader) {
			// FileReader are supported.
			getAsText(files[0]);
		} else {
			alert("FileReader are not supported in this browser.");
		}
	}

	function getAsText(fileToRead) {
		var reader = new FileReader();
		// Read file into memory as UTF-8
		reader.readAsText(fileToRead);
		// Handle errors load
		reader.onload = loadHandler;
		reader.onerror = errorHandler;
	}

	function loadHandler(event) {
		var csv = event.target.result;
		processData(csv);
	}

	function processData(csv) {
		var allTextLines = csv.split(/\r\n|\n/);
		var lines = [];
		for (var i = 0; i < allTextLines.length; i++) {
			var data = allTextLines[i].split(";");
			var tarr = [];
			for (var j = 0; j < data.length; j++) {
				tarr.push(data[j]);
			}
			lines.push(tarr);
		}
		console.log(lines);
		setCsvArray(lines);
	}

	function errorHandler(evt) {
		if (evt.target.error.name === "NotReadableError") {
			alert("Cannot read file !");
		}
	}

	function onChange(event) {
		setFile(event);
		var file = event.target.files[0];
		console.log(file);
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function (event) {
			// The file's text will be printed here
			console.log(event.target.result);
		};
	}

	function onChangeTest(event) {
		// var file = event.target.files[0];
		console.log(file);
		var reader = new FileReader();
		reader.readAsText(event[0]);
		reader.onload = function (event) {
			// The file's text will be printed here
			console.log(event.target.result);
		};
	}

	const [response, setResponse] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();
		setDisableUpload(true);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			setShowData(true);
		}, 2000);
		// axios
		// 	.post("http://127.0.0.1:8000/post", csvArray)
		// 	.then((response) => setResponse([response?.results]));

		// setDisableUpload(false);
		// setLoading(false);
	}

	return (
		<>
			<ToastContainer />
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ height: "100vh", width: "100vw" }}
			>
				<div className="corner_logo d-flex">
					<div style={{ padding: "5px 10px" }}>
						<img
							src={logo}
							alt=""
							height="auto"
							width="44px"
							className="pt-2"
						/>
					</div>
					<div style={{ padding: "10px 10px 10px 0px" }}>
						<h1 className="corner_logo_text mb-0">Babylytics</h1>
					</div>
				</div>
				{loading && (
					<>
						<Container style={{ width: "fit-content" }}>
							<LoadingSpin
								primaryColor="#fc5c7d"
								animationTimingFunction="linear"
								size="240px"
								width="12px"
								// style={{
								// 	// color: "linear-gradient(to right, #fc5c7d 0%, #6a82fb 100%)",
								// }}
							/>
						</Container>
					</>
				)}

				{!loading && !showData && (
					<>
						<Container className="text-center">
							<Row className="d-inline">
								<span className="display-3">Upload Fetal data</span>
								<span
									style={{ fontWeight: "100" }}
									className="text-muted display-3"
								>
									(CSV)
								</span>
							</Row>
							<Row
								className="d-flex align-items-center justify-content-center mt-3"
								style={{ margin: "0" }}
							>
								<Container>
									<FileUploader
										multiple={true}
										handleChange={onChangeTest}
										disabled={disableUpload}
										types={fileTypes}
										// hoverTitle="Drop Here"
										onTypeError={(e) => {
											console.error(e);
											toast.warn("You can only upload CSV files!", {
												autoClose: 5000,
											});
										}}
										maxSize={1}
										children={
											<div
												style={{
													borderColor: "#6c757d",
													borderStyle: "dashed",
													borderRadius: "10px",
													display: "flex",
													// justifyContent: "center",
													alignItems: "center",
													// maxWidth: "500px",
													// width: "500px",
													width: "fit-content",
													marginLeft: "auto",
													marginRight: "auto",
													padding: "20px 10px",
												}}
											>
												<span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="56"
														height="56"
														fill="#6c757d"
														className="bi bi-file-earmark-arrow-up"
														viewBox="0 0 16 16"
													>
														<path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
														<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
													</svg>
												</span>
												<span>
													<p className="text-muted display-5 my-0 p-2">
														{file
															? `File uploaded: ${file[0].name}`
															: "Upload or drop a spreadsheet here"}
													</p>
												</span>
											</div>
										}
									/>
								</Container>
								<Container>
									<input type="file" name="file" onChange={onChange} />
								</Container>
							</Row>
							<Row className="mt-3">
								<Form onSubmit={handleSubmit}>
									<Button
										className="submit_button"
										type="submit"
										f
										size="lg"
										disabled={disableUpload}
									>
										Submit
									</Button>
								</Form>
							</Row>

							{!file && (
								<>
									<Alert
										variant="warning"
										style={{
											position: "absolute",
											top: "20px",
											right: "20px",
											width: "fit-content",
										}}
									>
										No files uploaded yet
									</Alert>
								</>
							)}
						</Container>
					</>
				)}
				{showData && (
					<>
						<Data />
					</>
				)}
			</div>
		</>
	);
}

export default App;
