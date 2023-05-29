export function convertToJS(jsonObject: any, pastedClassName: string): string {
	const classDefinitions: string[] = [];
  
	const generateDartCode = (obj: any, className: string): string => {
	  let code = `class ${className} {\n`;
  
	//   for (const key in obj) {
	// 	const value = obj[key];
	// 	const valueType = typeof value;
	// 	let dartType = '';
  
	// 	if (valueType === 'string') {
	// 	  dartType = 'String?';
	// 	} else if (valueType === 'number') {
	// 		if (isFloat(value)) {
	// 			dartType = 'float?';
	// 		} else {
	// 			dartType = 'int?';
	// 		}
	// 	} else if (valueType === 'boolean') {
	// 	  dartType = 'bool?';
	// 	} else if (Array.isArray(value)) {
	// 	  const firstElementType = value.length > 0 ? typeof value[0] : 'dynamic';
	// 	  if (firstElementType === 'object' && value[0] !== null) {
	// 		const arrayClassName = `${className}${capitalizeFirstLetter(key)}`;
	// 		const nestedClass = generateDartCode(value[0], arrayClassName);
	// 		classDefinitions.push(nestedClass);
	// 		// dartType = `${arrayClassName}[]`;
	// 		dartType = `List<${arrayClassName}>?`
	// 	  } else {
	// 		dartType = `${generateDartType(firstElementType)}[]`;
	// 	  }
	// 	} else if (valueType === 'object' && value !== null) {
	// 	  const nestedClassName = `${className}${capitalizeFirstLetter(key)}`;
	// 	  const nestedClass = generateDartCode(value, nestedClassName);
	// 	  classDefinitions.push(nestedClass);
	// 	  dartType = nestedClassName;
	// 	} else {
	// 	  dartType = 'dynamic';
	// 	}
  
	// 	code += `	${dartType} ${key};\n`;
	//   }
  
	//   code += `\n`;

	  // Add constructor
	  code += `	\nconstructor(`
      let params: String[] = [];
	  for (const key in obj) {
        params.push(key)
		// code += `    data['${key}'] = ${key};\n`;
		// code += `this.${key}, `
	  }
      params.forEach(function(value) {

        code += `${value}, `
      });
      code = code.substring(0, code.length - 2);
	  code += `) {\n`
      params.forEach(function(value) {
        code += `   this.${value} = ${value};\n`
      });

	  // Generate fromJson function
	//   code += `\n${className}.fromJson(Map<String, dynamic> json) {\n`;
	//   for (const key in obj) {
		
	// 	const valueType = typeof obj[key];
    //     const arrayClassName = `${className}${capitalizeFirstLetter(key)}`;

		
	// 	if (Array.isArray(obj[key])) {
	// 		code += `      if (json['${key}'] != null) {\n`;
	// 		code += `        ${key} = <${arrayClassName}>[];\n`;
	// 		code += `        json['${key}'].forEach((v) {\n`;
	// 		code += `           ${key}!.add(${arrayClassName}.fromJson(v));\n`;
	// 		code += `      });\n}\n`;
	// 	} else if (valueType === 'object' && obj[key] !== null) {
	// 		code += `      ${key} = ${arrayClassName}.fromJson(json['${key}']);\n`;
	// 	} else {
	// 	  code += `      ${key} = json['${key}'];\n`;
	// 	}
	// 	// code += `    }\n`;
	//   }
	//   code += `  }\n`;


	  // APpeend tojson function
	//   code += '\nMap<dynamic, dynamic> toJson() {\n';
	//   code += `	final Map<String, dynamic> data = new Map<String, dynamic>();\n`
	//   for (const key in obj) {
	// 	const valueType = typeof obj[key];
	// 	if (Array.isArray(obj[key])) {
	// 		code += `	if (this.${key} != null) {\n`
	// 		code += `	 data['${key}'] = this.${key}!.map((v) => v.toJson()).toList();\n	}`
	// 	} else {
	// 		code += `	data['${key}'] = this.${key};\n`;
	// 	}
		

	//   }
	//   code += `\n	return data;\n	}\n`;

    code += `}\n}`;

	  return code;
	};
  
	const generateDartType = (value: any): string => {
	  if (typeof value === 'string') {
		return 'String';
	  } else if (typeof value === 'number') {
		if (isFloat(value)) {
			return 'float';
		} else {
			return 'int';
		}
		// return 'num';
	  } else if (typeof value === 'boolean') {
		return 'bool';
	  } else if (Array.isArray(value)) {
		const firstElementType = value.length > 0 ? typeof value[0] : 'dynamic';
		return `${generateDartType(firstElementType)}[]`;
	  } else if (typeof value === 'object' && value !== null) {
		return 'GeneratedClass'; // Placeholder for nested object class
	  } else {
		return 'dynamic';
	  }
	};
  
	const capitalizeFirstLetter = (str: string): string => {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	};

	//check if float
	function isFloat(value: number) {
		if (
		  typeof value === 'number' &&
		  !Number.isNaN(value) &&
		  !Number.isInteger(value)
		) {
		  return true;
		}
	  
		return false;
	  }
  
	const className = pastedClassName;
	// const className = 'GeneratedClass'; // You can provide a custom class name here
	const classCode = generateDartCode(jsonObject, className);
	classDefinitions.push(classCode);
  
	return [...new Set(classDefinitions)].join('\n\n');
  }

