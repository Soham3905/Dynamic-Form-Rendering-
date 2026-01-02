import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

  // Get Redux state for auto-population
  const reduxState = useSelector(state => state.auth || {});

  // Auto-populate address fields when checkbox is checked
  // Also handle ifPopulatedRemove to clear fields when checkbox is unchecked
  useEffect(() => {
    const checkboxValue = formData.installationAddressSameAsCurrent;
    
    if (checkboxValue === true) {
      // Populate address and houseDetails from Redux
      setFormData(prev => ({
        ...prev,
        address: prev.address || reduxState.completeAddress || '',
        houseDetails: prev.houseDetails || reduxState.houseDetails || '',
        area: prev.area || reduxState.area || '',
        pincode: prev.pincode || reduxState.pincode || '',
        city: prev.city || reduxState.city || '',
      }));
    } else if (checkboxValue === false) {
      // If checkbox is unchecked, clear auto-populated fields (ifPopulatedRemove: true)
      setFormData(prev => ({
        ...prev,
        address: '',
        houseDetails: '',
        area: '',
        pincode: '',
        city: '',
      }));
    }
  }, [formData.installationAddressSameAsCurrent,reduxState.area,reduxState.city,reduxState.completeAddress,reduxState.houseDetails,reduxState.pincode]);

  // Track if mobile number was changed to show OTP field
  useEffect(() => {
    const mobileValue = formData.mobileNumber;
    // If mobile has a value, show OTP field (this sets a flag internally)
    // The field visibility logic will check this using showIfValueChanged
  }, [formData.mobileNumber]);


  // ---- Visibility helpers ----
  const checkSectionVisibility = section => {
    // Check conditional logic showIf
    if (section.conditionalLogic?.showIf) {
      return section.conditionalLogic.showIf.every(condition => {
        if (condition.getValueFrom === 'redux') {
          return reduxState[condition.getValueFromKey] === condition.shouldValue;
        }
        return true;
      });
    }
    // Fallback: check isHidden flag
    return !section.sectionConfig?.isHidden;
  };

  const checkFieldVisibility = field => {
    // Check conditional logic showIf
    if (field.conditionalLogic?.showIf) {
      return field.conditionalLogic.showIf.every(condition => {
        if (condition.getValueFrom === 'redux') {
          return reduxState[condition.getValueFromKey] === condition.shouldValue;
        }
        return true;
      });
    }
    
    // Check conditional logic showIfValueChanged (for OTP field showing after mobile entered)
    if (field.conditionalLogic?.showIfValueChanged) {
      return field.conditionalLogic.showIfValueChanged.some(condition => {
        if (condition.getValueFrom === 'jsonField') {
          const fieldValue = formData[condition.getValueFromKey];
          // Show if field value exists and is not empty
          if (condition.operator === 'changed') {
            return fieldValue && String(fieldValue).trim().length > 0;
          }
        }
        return false;
      });
    }
    
    // Fallback: check isHidden flag
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
    // Check conditional logic mandatoryIf
    if (field.conditionalLogic?.mandatoryIf) {
      const isConditionallyMandatory = field.conditionalLogic.mandatoryIf.every(condition => {
        if (condition.getValueFrom === 'redux') {
          return reduxState[condition.getValueFromKey] === condition.shouldValue;
        }
        return true;
      });
      if (isConditionallyMandatory) return true;
    }
    // Fallback: check base mandatory flag
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
