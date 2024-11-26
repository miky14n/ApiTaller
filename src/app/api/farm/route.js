import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Obtener todos los registros de la tabla 'farm'
export async function GET() {
  try {
    const farms = await prisma.farm.findMany();
    return NextResponse.json(farms, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos" },
      { status: 500 }
    );
  }
}

// POST: Insertar un nuevo registro en la tabla 'farm'
export async function POST(request) {
  try {
    const data = await request.json(); // Parsear los datos enviados en el body
    const { temperature, ambientHumidity, humity } = data;

    // Validar que los datos requeridos estén presentes
    if (!temperature || !humity) {
      return NextResponse.json(
        { error: "Faltan datos requeridos: temperature y humity" },
        { status: 400 }
      );
    }

    // Crear el nuevo registro
    const newFarm = await prisma.farm.create({
      data: {
        temperature,
        ambientHumidity: ambientHumidity || null, // Opcional
        humity,
      },
    });

    return NextResponse.json(newFarm, { status: 201 });
  } catch (error) {
    console.error("Error al insertar los datos:", error);
    return NextResponse.json(
      { error: "Error al insertar los datos del sensor" },
      { status: 500 }
    );
  }
}
