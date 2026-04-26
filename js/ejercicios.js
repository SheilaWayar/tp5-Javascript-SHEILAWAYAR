// (a) calcularPromedio con reduce
const calcularPromedio = (notas) => {
    const suma = notas.reduce((acum, nota) => acum + nota, 0);
    return suma / notas.length;
};

// (b) filtrarAprobados con filter - nota >= 6
const filtrarAprobados = (alumnos) => {
    return alumnos.filter(alumno => alumno.nota >= 6);
};

// (c) formatearAlumnos con map - formato "Nombre: X - Nota: Y"
const formatearAlumnos = (alumnos) => {
    return alumnos.map(alumno => `Nombre: ${alumno.nombre} - Nota: ${alumno.nota}`);
};

// (d) buscarAlumno con find
const buscarAlumno = (alumnos, nombre) => {
    return alumnos.find(alumno => alumno.nombre === nombre);
};

// PRUEBAS CON console.log como pide la consigna
const notas = [7, 8, 6, 10, 5];
const alumnos = [
  { nombre: "Sheila", nota: 9 },
  { nombre: "Dani", nota: 5 },
  { nombre: "Juan", nota: 6 },
  { nombre: "Ana", nota: 10 }
];

console.log("a) Promedio:", calcularPromedio(notas));
console.log("b) Aprobados:", filtrarAprobados(alumnos));
console.log("c) Formateados:", formatearAlumnos(alumnos));
console.log("d) Buscar Sheila:", buscarAlumno(alumnos, "Sheila"));
console.log("d) Buscar Pedro:", buscarAlumno(alumnos, "Pedro"));