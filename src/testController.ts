import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Request,
    Route,
    SuccessResponse,
  } from "tsoa";
import qrcode from "qrcode";

//import express
import express from "express";


@Route("/")
export class TestController extends Controller {
    
    // Endpoint that return "Hello World"
    @Get("/")
    public async HelloWorld(): Promise<string> {
        return "Hello World";
    }

    // POST Endpoint 
    // On Success return 201
    @SuccessResponse("201", "Created")
    @Post("/")
    public async PostHelloWorld(@Body() body: string): Promise<void> {
        this.setStatus(201);
    }
    
    // GET Endpoint that returns a QR Code as a PNG
    // The qr code contains the given query parameter "text"
    @Get("/qr")
    public async GetQRCode(
        @Request() request: express.Request, 
        @Query() text: string): Promise<Buffer> {
        const buffer = await qrcode.toBuffer(text, { type: "png", margin: 1, scale: 10 });
        // set header to png
        this.setHeader("Content-Type", "image/png");

        const response = (<any>request).res as express.Response;
        response.setHeader("Content-Type", "image/png");
        response.end(buffer);
        return null;
    }
}
