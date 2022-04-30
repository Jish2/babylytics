import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Container, Row, Alert } from "react-bootstrap";
import LoadingSpin from "react-loading-spin";

const fileTypes = ["CSV"];

function App() {
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);
	const handleChange = (file) => {
		setFile(file);
	};

	return (
		<div
			className="d-flex align-items-center justify-content-center"
			style={{ height: "100vh", width: "100vw" }}
		>
			{loading && (
				<>
					<Container style={{ width: "fit-content" }}>
						<LoadingSpin
							primaryColor="red"
							animationTimingFunction="linear"
							size="240px"
							width="12px"
						/>
					</Container>
				</>
			)}

			{!loading && (
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
									handleChange={handleChange}
									types={fileTypes}
									hoverTitle="Drop Here"
									onTypeError={(e) => {
										console.log(e);
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
													class="bi bi-file-earmark-arrow-up"
													viewBox="0 0 16 16"
												>
													<path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
													<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
												</svg>
											</span>
											<span>
												<p className="text-muted display-5 my-0 p-2">
													Upload or drop a spreadsheet here
												</p>
											</span>
										</div>
									}
								/>
							</Container>
						</Row>
						<Row className="mt-4">
							<Container className="d-flex justify-content-center align-items-center">
								<Alert variant="warning" style={{ width: "300px" }}>
									{file
										? `File name: ${file[0].name}`
										: "No files uploaded yet"}
								</Alert>
							</Container>
						</Row>
					</Container>
				</>
			)}
		</div>
	);
}

export default App;
