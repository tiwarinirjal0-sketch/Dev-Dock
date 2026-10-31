/*
   -users upload a file 
   -search for base files like package.json for node to identify what kind of language is project based on 
   -return the type of language it is based upon
*/

import { searchFile } from "../../src/utils/helper.js";

export async function ProjectTypeDetector(projectPath){
    let markers = [];
    const baseForDetection = [
                // JavaScript / TypeScript runtimes
                { file: "package.json", type: "node" },
                { file: "deno.json", type: "deno" },
                { file: "deno.jsonc", type: "deno" },

                // Python
                { file: "pyproject.toml", type: "python" },
                { file: "requirements.txt", type: "python" },
                { file: "Pipfile", type: "python" },
                { file: "setup.py", type: "python" },
                { file: "setup.cfg", type: "python" },

                // PHP
                { file: "composer.json", type: "php" },

                // Go
                { file: "go.mod", type: "go" },

                // Rust
                { file: "Cargo.toml", type: "rust" },

                // Java - Maven and Gradle
                { file: "pom.xml", type: "java" },
                { file: "build.gradle", type: "java" },
                { file: "build.gradle.kts", type: "java" },

                // Ruby
                { file: "Gemfile", type: "ruby" },

                // C# / .NET
                { file: ".csproj", type: "dotnet" },
                { file: ".sln", type: "dotnet" },

                // Elixir
                { file: "mix.exs", type: "elixir" },

                // Dart / Flutter
                { file: "pubspec.yaml", type: "dart" },

                // Swift
                { file: "Package.swift", type: "swift" },

                // Scala
                { file: "build.sbt", type: "scala" },

                // C / C++
                { file: "CMakeLists.txt", type: "cpp" },
                { file: "Makefile", type: "native" },

                // Docker
                { file: "Dockerfile", type: "docker" },
                { file: "docker-compose.yml", type: "docker-compose" },
                { file: "compose.yaml", type: "docker-compose" },
            ];

            for(const fileName of baseForDetection){
                const detected = await searchFile(projectPath,fileName.file)
                if(detected) markers.push(fileName.type)
                
            }
            markers.forEach((f)=>console.log(f))
            return markers
}