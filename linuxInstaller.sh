

if [[ -z "$sorter" ]]; then 
	echo "export sorter='node $(pwd)/index.js'" >> ~/.bashrc
	echo Succed installed!
else 
	echo You have installed sorter!
fi

