<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use \Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
class CodeRunner extends Controller
{
    //
    public function handleCodeRequest(Request $request)
    {

        $language = $request->language;
        $code = $request->code;

        $output = null;
        try {
            switch ($language) {

                case 'js':
                    $output = $this->runJsCode($code);
                    break;
                case 'python':
                    $output = $this->runPythonCode($code);
                    break;
                case 'c':
                    $output = $this->runCCode($code);
                    break;
                default:
                    return response()->json(['output' => null]);
            }


        } catch (Exception $e) {
            $output = $e->getMessage();
        }

        return response()->json(['output' => $output]);



    }//hanlde Request


    private function runPythonCode(string $code)
    {
        $process = new Process(['python3', '-c', $code]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }//if not
        return $process->getOutput();

    }//

    private function runJsCode(string $code)
    {
        $process = new Process(['node', '-e', $code]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }//if not
        return $process->getOutput();

    }//


    private function runCCode($code)
    {
        // Create a temporary file to hold the C code
        $sourceFile = "/tmp/" . time() . "temp_code.c";
        file_put_contents($sourceFile, $code);

        // Define the output file for the compiled code
        $binaryFile = '/tmp/' .time() . 'temp_code';

        // Compile the C code
        $test = new Process(['gcc --version']);
        $test->run();
        return $test->getOutput();
        $compileProcess = new Process(['gcc', $sourceFile, '-o', $binaryFile]);
        $compileProcess->run();
        unlink($sourceFile);

        if (!$compileProcess->isSuccessful()) {
            throw new ProcessFailedException($compileProcess);
        }


        // Execute the compiled code
        $executeProcess = new Process([$binaryFile]);
        $executeProcess->run();
        unlink($binaryFile);

        if (!$executeProcess->isSuccessful()) {
            throw new ProcessFailedException($executeProcess);
        }

        // Clean up temporary files

        return $executeProcess->getOutput();
    }//runCcode


}
