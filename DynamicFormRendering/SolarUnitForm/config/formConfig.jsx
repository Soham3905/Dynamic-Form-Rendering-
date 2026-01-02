export const formConfigData = {
  sectionsConfig: [
    {
      sectionKey: 'solarUnitDetails',
      header: 'Solar panel details',
      subHeader: '',
      description: '',
      sectionConfig: {
        isHidden: false,
        isCollapsed: false,
        isCollapsable: true,
      },
    },
    {
      sectionKey: 'installationDetails',
      header: 'Installation details',
      subHeader: 'Address details (as per E-bill)',
      description: '',
      sectionConfig: {
        isHidden: false,
        isCollapsed: false,
        isCollapsable: true,
      },
    },
    {
      sectionKey: 'homeOwnerDetails',
      header: 'Homeowner details',
      subHeader: '',
      description: '',
      sectionConfig: {
        isHidden: false,
        isCollapsed: false,
        isCollapsable: true,
      },
      conditionalLogic: {
        showIf: [
          {
            fieldName: 'isBillOnYourName',
            getValueFrom: 'redux',
            getValueFromKey: 'isBillOnYourName',
            shouldValue: 'NO',
            operator: 'equals',
            trackOnChangedValueIsSame: false,
          },
        ],
      },
    },
    {
      sectionKey: 'documentUpload',
      header: 'Upload the below documents to get started',
      subHeader: '',
      description: 'Ensure all the required documents are uploaded to proceed',
      sectionConfig: {
        isHidden: false,
        isCollapsed: false,
        isCollapsable: true,
      },
    },
  ],

  fieldsList: {
    solarUnitDetails: [
      {
        fieldName: 'manufacturerName',
        title: 'Manufacturer name',
        placeholder: 'Select manufacturer',
        type: 'SEARCH_DRAWER',
        options: [
          { name: 'Tata Power Solar', value: 'tata_power' },
          { name: 'Luminous', value: 'luminous' },
          { name: 'V-Guard', value: 'vguard' },
          { name: 'Trina Solar', value: 'trina_solar' },
        ],
        fieldConfig: {
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Manufacturer name is required',
          },
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'noOfSolarInstallations',
        title: 'Select the number of solar unit to be installed',
        placeholder: '',
        type: 'RADIO',
        options: [
          { name: '1', value: '1' },
          { name: '>1', value: 'MORE_THAN_ONE' },
        ],
        fieldConfig: {
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Number of solar units is required',
          },
        },
        ifPopulatedRemove: false,
      },
    ],

    installationDetails: [
      {
        fieldName: 'installationAddressSameAsCurrent',
        title: '',
        placeholder: 'Installation address same as current address  ',
        type: 'CHECKBOX',
        fieldConfig: {
          isMandatory: false,
          isVisible: true,
          isEditable: true,
        },
        ifPopulatedRemove: true,
      },
      {
        fieldName: 'address',
        title: 'Address as per E-bill',
        placeholder: 'Enter address as per E-bill',
        type: 'TEXT',
        fieldConfig: {
          maxLength: 200,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Installation address is required',
            invalid: 'Please enter a valid address',
          },
        },
        conditionalLogic: {
          populateValue: [
            {
              fieldName: 'installationAddressSameAsCurrent',
              getValueFrom: 'redux',
              getValueFromKey: 'completeAddress',
              shouldValue: true,
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'houseDetails',
        title: 'House details',
        placeholder: 'Flat/house no.',
        type: 'TEXT',
        fieldConfig: {
          regex:
            '^(?=.*[a-zA-Z0-9])[a-zA-Z0-9 !@#$%&*()_+<>:;’./?,|`~-]*$',
          pattern: 'text',
          maxLength: 100,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'House details is required',
            invalid: 'Please enter valid house details',
          },
        },
        conditionalLogic: {
          populateValue: [
            {
              fieldName: 'installationAddressSameAsCurrent',
              getValueFrom: 'redux',
              getValueFromKey: 'houseDetails',
              shouldValue: true,
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'area',
        title: 'Area/locality',
        placeholder: 'Street, road, etc.',
        type: 'TEXT',
        fieldConfig: {
          regex:
            '^(?=.*[a-zA-Z0-9])[a-zA-Z0-9 !@#$%&*()_+<>:;’./?,|`~-]*$',
          pattern: 'text',
          maxLength: 100,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Area/locality is required',
            invalid: 'Please enter valid area/locality',
          },
        },
        conditionalLogic: {
          populateValue: [
            {
              fieldName: 'installationAddressSameAsCurrent',
              getValueFrom: 'redux',
              getValueFromKey: 'area',
              shouldValue: 'true',
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'pincode',
        title: 'Pincode',
        placeholder: 'Enter pincode',
        type: 'PINCODE',
        fieldConfig: {
          regex: '^[1-9][0-9]{5}$',
          pattern: 'pincode',
          maxLength: 6,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Pincode is required',
            invalid: 'Please enter a valid 6-digit pincode',
          },
        },
        conditionalLogic: {
          populateValue: [
            {
              fieldName: 'installationAddressSameAsCurrent',
              getValueFrom: 'redux',
              getValueFromKey: 'pincode',
              shouldValue: 'true',
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'city',
        title: 'City',
        placeholder: 'Enter city',
        type: 'TEXT',
        fieldConfig: {
          regex: '^[A-Za-z ]{1,50}$',
          pattern: 'text',
          maxLength: 50,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'City is required',
            invalid: 'Please enter valid city name',
          },
        },
         conditionalLogic: {
          populateValue: [
            {
              fieldName: 'installationAddressSameAsCurrent',
              getValueFrom: 'redux',
              getValueFromKey: 'city',
              shouldValue: 'true',
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'consumerNo',
        title: 'Consumer number (as per light bill)',
        placeholder: 'Enter consumer number',
        type: 'TEXT',
        fieldConfig: {
          regex: '^[A-Za-z0-9]{1,20}$',
          pattern: 'text',
          maxLength: 30,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Consumer number is required',
            invalid: 'Please enter a valid consumer number',
          },
        },
        ifPopulatedRemove: false,
      },
    ],

    homeOwnerDetails: [
      {
        fieldName: 'firstName',
        title: 'First name (as per PAN)',
        placeholder: 'Enter first name',
        type: 'TEXT',
        fieldConfig: {
          regex: '^[A-Za-z ]{1,50}$',
          pattern: 'text',
          maxLength: 50,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'First name is required',
            invalid: 'Please enter a valid first name',
          },
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'lastName',
        title: 'Last name (as per PAN)',
        placeholder: 'Enter last name',
        type: 'TEXT',
        fieldConfig: {
          regex: '^[A-Za-z ]{1,50}$',
          pattern: 'text',
          maxLength: 50,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Last name is required',
            invalid: 'Please enter a valid last name',
          },
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'emailId',
        title: 'Email ID',
        placeholder: 'Enter email address',
        type: 'EMAIL',
        fieldConfig: {
          regex:
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          pattern: 'email',
          maxLength: 30,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Email ID is required',
            invalid: 'Please enter a valid email address',
          },
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'mobileNumber',
        title: 'Mobile number',
        placeholder: 'Enter mobile number',
        type: 'MOBILE',
        fieldConfig: {
          pattern: 'mobile',
          maxLength: 10,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Mobile number is required',
            invalid: 'Please enter a valid 10-digit mobile',
          },
        },
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'otpVerification',
        title: 'OTP verification',
        placeholder: 'Enter OTP',
        type: 'OTP',
        fieldConfig: {
          regex: '^[0-9]{6}$',
          pattern: 'numeric',
          maxLength: 6,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'OTP is required',
            invalid: 'Please enter a valid 6-digit OTP',
          },
        },
        conditionalLogic: {
          showIfValueChanged: [
            {
              fieldName: 'mobileNumber',
              getValueFrom: 'jsonField',
              getValueFromKey: 'mobileNumber',
              operator: 'changed',
              trackOnChangedValueIsSame: true,
            },
          ],
        },
        ifPopulatedRemove: false,
      },
    ],

    documentUpload: [
      {
        fieldName: 'ebill',
        title: 'E-bill / Receipt',
        placeholder: '',
        type: 'FILE_UPLOAD',
        fieldConfig: {
          isMandatory: false,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'E-bill document is required',
            invalid:
              'Please upload a valid document (PDF, JPG, PNG)',
          },
          description:
            'Upload a clear and readable copy of your electricity bill',
          acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
          maxFileSize: '5MB',
        },
        bucketName: 'esdoc',
        docId: '1',
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'proofOfRelation',
        title: 'Proof of relation',
        placeholder: '',
        type: 'FILE_UPLOAD',
        fieldConfig: {
          isMandatory: false,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required:
              'Proof of relation document is required',
            invalid:
              'Please upload a valid document (PDF, JPG, PNG)',
          },
          description: 'Provide a clear image of the relationship document',
          acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
          maxFileSize: '5MB',
        },
        conditionalLogic: {
          showIf: [
            {
              fieldName: 'isBillOnYourName',
              getValueFrom: 'redux',
              getValueFromKey: 'isBillOnYourName',
              shouldValue: 'NO',
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
          mandatoryIf: [
            {
              fieldName: 'isBillOnYourName',
              getValueFrom: 'redux',
              getValueFromKey: 'isBillOnYourName',
              shouldValue: 'NO',
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
        },
        bucketName: 'esdoc',
        s3BasePath: 'SolarDocs/PROOFREL',
        docId: '8',
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'propertyDoc',
        title: 'Property document / House registration',
        placeholder: '',
        type: 'FILE_UPLOAD',
        fieldConfig: {
          isMandatory: false,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required:
              'Property document / house registration is required',
            invalid:
              'Please upload a valid document (PDF, JPG, PNG)',
          },
          acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
          maxFileSize: '5MB',
          description:
            'Upload a clear image of the house registration document showing owner and property details.',
        },
        conditionalLogic: {
          showIf: [
            {
              fieldName: 'propertyDoc',
              getValueFrom: 'redux',
              getValueFromKey: 'propertyDoc',
              shouldValue: 'true',
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
          mandatoryIf: [
            {
              fieldName: 'propertyDoc',
              getValueFrom: 'redux',
              getValueFromKey: 'propertyDoc',
              shouldValue: 'true',
              operator: 'equals',
              trackOnChangedValueIsSame: false,
            },
          ],
        },
        bucketName: 'esdoc',
        s3BasePath: 'SolarDocs/PROPERTYDOC',
        docId: '11',
        ifPopulatedRemove: false,
      },
      {
        fieldName: 'sanctionLetter',
        title: 'TFR /Sanctioned letter',
        type: 'FILE_UPLOAD',
        fieldConfig: {
          isMandatory: false,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required:
              'Sanctioned letter document is required',
            invalid:
              'Please upload a valid document (PDF, JPG, PNG)',
          },
          description: 'Upload a clear photo of the sanctioned letter',
          acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
          maxFileSize: '5MB',
        },
        bucketName: 'esdoc',
        s3BasePath: 'SolarDocs/SLETTER',
        docId: '4',
        ifPopulatedRemove: false,
      },
    ],
  },
};
