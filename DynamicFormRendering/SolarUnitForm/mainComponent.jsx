import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { formConfigData } from './config/formConfig';
import { FormSection } from './components/FormSection';

const MainComponent = ({ navigation }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    solarUnitDetails: true,
    installationDetails: true,
    homeOwnerDetails: true,
    documentUpload: true,
  });

  // ---- Visibility helpers ----
  const checkSectionVisibility = section => {
    // Change this logic as per your requirement
    // Right now: show all sections that are not hidden
    return !section.sectionConfig?.isHidden;
  };

  const checkFieldVisibility = field => {
    // If your config has some visibility flag, handle it here
    // For now: if isHidden is true -> hide, else show
    if (field.fieldConfig?.isHidden === true) return false;
    return true;
  };

  // ---- Handlers ----
  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    // Clear error for this field if present
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const toggleSection = sectionKey => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const isFieldMandatory = field => {
    return !!field.fieldConfig?.isMandatory;
  };


  const isFormValid = () => {
    let valid = true;
    const newErrors = {};

    formConfigData.sectionsConfig.forEach(section => {
      // Skip hidden sections
      if (section.sectionConfig?.isHidden || !checkSectionVisibility(section)) {
        return;
      }

      const fields = formConfigData.fieldsList[section.sectionKey];

      fields?.forEach(field => {
        if (!checkFieldVisibility(field)) return;

        // Use trimmed string for validation to ignore accidental whitespace
        const rawValue = formData[field.fieldName];
        const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
        const isMandatory = isFieldMandatory(field);

        // Required check (treat empty string as missing)
        if (isMandatory && (value === undefined || value === null || (typeof value === 'string' && value.length === 0))) {
          valid = false;
          newErrors[field.fieldName] =
            field.fieldConfig?.errorMessages?.required ||
            'This field is required';
          return;
        }

        // Regex check (only when there's a value and a regex)
        if (value && field.fieldConfig?.regex) {
          const regex = new RegExp(field.fieldConfig.regex);
          if (!regex.test(String(value))) {
            valid = false;
            newErrors[field.fieldName] =
              field.fieldConfig?.errorMessages?.invalid ||
              'Invalid format';
          }
        }
      });
    });

    setErrors(newErrors);
    return valid;
  };

  const handleContinue = () => {
    if (isFormValid()) {
      console.log('Form Data:', formData);
      Alert.alert('Success', 'Form submitted successfully!', [
        {
          text: 'OK',
          onPress: () => console.log('Form submitted:', formData),
        },
      ]);
      navigation.navigate('Other Forms');
    } else {
      Alert.alert('Error', 'Please fill all required fields correctly');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-2 mb-20">
        {formConfigData.sectionsConfig.map(section => {
          if (
            section.sectionConfig?.isHidden ||
            !checkSectionVisibility(section)
          ) {
            return null;
          }

          return (
            <FormSection
              key={section.sectionKey}
              section={section}
              fields={formConfigData.fieldsList[section.sectionKey]}
              isExpanded={expandedSections[section.sectionKey]}
              formData={formData}
              errors={errors}
              onToggle={() => toggleSection(section.sectionKey)}
              onFieldChange={handleFieldChange}
              checkFieldVisibility={checkFieldVisibility}
              isFieldMandatory={isFieldMandatory}
            />
          );
        })}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          className="bg-blue-600 rounded-lg py-4 items-center shadow-lg"
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainComponent;
