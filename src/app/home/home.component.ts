import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "../services/electron.service";
import { ChildProcessWithoutNullStreams } from "child_process";
import { Server, Socket } from "net";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	server: Server;

	constructor(private router: Router, private electronService: ElectronService) {
		this.server = electronService.net.createServer((socket: Socket) => {
			socket.on("data", (data: Buffer) => {
				console.log("DATA: " + data.toString());
			});
		});

		this.server.on("connection", (socket: Socket) => {
			console.log("CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);
		});

		this.server.listen(3171, "0.0.0.0");
	}

	ngOnInit(): void {
		console.log("HomeComponent INIT");
	}

	onClick(): void {
		console.log(process.env.path);
		let cmd: string = "ps";
		let proc: ChildProcessWithoutNullStreams = this.electronService.childProcess.spawn(cmd);

		proc.stdout.on("data", (data) => {
			console.log(data.toString());
		});

		proc.stderr.on("data", (data) => {
			console.log(data.toString());
		});
	}
}
