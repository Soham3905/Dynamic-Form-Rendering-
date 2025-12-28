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
      },
    ],
    installationDetails: [
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
      },
      {
        fieldName: 'houseDetails',
        title: 'House details',
        placeholder: 'Flat/house no.',
        type: 'TEXT',
        fieldConfig: {
          maxLength: 100,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'House details is required',
            invalid: 'Please enter valid house details',
          },
        },
      },
      {
        fieldName: 'area',
        title: 'Area/locality',
        placeholder: 'Street, road, etc.',
        type: 'TEXT',
        fieldConfig: {
          maxLength: 100,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Area/locality is required',
            invalid: 'Please enter valid area/locality',
          },
        },
      },
      {
        fieldName: 'pincode',
        title: 'Pincode',
        placeholder: 'Enter pincode',
        type: 'PINCODE',
        fieldConfig: {
          regex: '^[1-9][0-9]{5}$',
          pattern: 'pincode',
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Pincode is required',
            invalid: 'Please enter a valid 6-digit pincode',
          },
        },
      },
      {
        fieldName: 'city',
        title: 'City',
        placeholder: 'Enter city',
        type: 'TEXT',
        fieldConfig: {
          maxLength: 50,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'City is required',
            invalid: 'Please enter valid city name',
          },
        },
      },
      {
        fieldName: 'consumerNo',
        title: 'Consumer number (as per light bill)',
        placeholder: 'Enter consumer number',
        type: 'TEXT',
        fieldConfig: {
          maxLength: 30,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Consumer number is required',
            invalid: 'Please enter a valid consumer number',
          },
        },
      },
    ],
    homeOwnerDetails: [
      {
        fieldName: 'firstName',
        title: 'First name (as per PAN)',
        placeholder: 'Enter first name',
        type: 'TEXT',
        fieldConfig: {
          maxLength: 50,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'First name is required',
            invalid: 'Please enter a valid first name',
          },
        },
      },
      {
        fieldName: 'lastName',
        title: 'Last name (as per PAN)',
        placeholder: 'Enter last name',
        type: 'TEXT',
        fieldConfig: {
          maxLength: 50,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Last name is required',
            invalid: 'Please enter a valid last name',
          },
        },
      },
      {
        fieldName: 'emailId',
        title: 'Email ID',
        placeholder: 'Enter email address',
        type: 'EMAIL',
        fieldConfig: {
          maxLength: 30,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          // Basic email regex: requires an @ and a domain (e.g., user@example.com)
          regex: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$',
          errorMessages: {
            required: 'Email ID is required',
            invalid: 'Please enter a valid email address',
          },
        },
      },
      {
        fieldName: 'mobileNumber',
        title: 'Mobile number',
        placeholder: 'Enter mobile number',
        type: 'MOBILE',
        fieldConfig: {
          maxLength: 10,
          isMandatory: true,
          isVisible: true,
          isEditable: true,
          errorMessages: {
            required: 'Mobile number is required',
            invalid: 'Please enter a valid 10-digit mobile',
          },
        },
      },
    ],
    documentUpload: [
      {
        fieldName: 'ebill',
        title: 'E-bill',
        placeholder: '',
        type: 'FILE_UPLOAD',
        fieldConfig: {
          isMandatory: false,
          isVisible: true,
          isEditable: true,
          description:
            'Upload a clear and readable copy of your electricity bill',
          acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
          maxFileSize: '5MB',
        },
        bucketName: 'esqadoc-qa',
        docId: '1',
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
          description: 'Provide a clear image of the relationship document',
          acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
          maxFileSize: '5MB',
        },
        bucketName: 'esqadoc-qa',
        docId: '8',
      },
      {
        fieldName: 'sanctionLetter',
        title: 'TFR /Sanctioned letter',
        placeholder: '',
        type: 'FILE_UPLOAD',
        fieldConfig: {
          isMandatory: false,
          isVisible: true,
          isEditable: true,
          description: 'Upload a clear photo of the sanctioned letter',
          acceptedFormats: ['pdf', 'jpg', 'jpeg', 'png'],
          maxFileSize: '5MB',
        },
        bucketName: 'esqadoc-qa',
        docId: '4',
      },
    ],
  },
};
